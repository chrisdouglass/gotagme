import {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {FlickrFetcher} from '../../flickr/flickr_fetcher';
import {User} from '../../model/user';
import {huskysoft} from '../../protos';
import {ApprovalStore} from '../../store/approval.store';
import {CostumeStore} from '../../store/costume.store';
import {FlickrPhotoStore} from '../../store/flickr_photo.store';
import {PhotoStore} from '../../store/photo.store';
import {TagStore} from '../../store/tag.store';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';
import {PhotoAPI} from './photo-api';

/** Creates a router configured with the Photo API endpoints. */
export class PhotoRouterProvider extends RouterProvider {
  private _photoAPI: PhotoAPI;
  private _authHandler: RequestHandler;

  constructor(
      connection: Connection, authHandler?: RequestHandler,
      flickrFlickr?: FlickrFetcher) {
    super();
    this._photoAPI = new PhotoAPI(
        new PhotoStore(connection), new TagStore(connection),
        new CostumeStore(connection), new UserStore(connection),
        new ApprovalStore(connection), new FlickrPhotoStore(connection),
        flickrFlickr ? flickrFlickr : FlickrFetcher.default());
    this._authHandler = authHandler ? authHandler : Handlers.basicAuthenticate;
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachIDRoutes(router);
  }

  /**
   * Base routes.
   * POST / - Inserts by the flickrUrl parameter. Provide an array of
   * Urls as strings to insert. REQUIRES AUTHENTICATION.
   * @param router The router for adding routes.
   */
  private attachBaseRoutes(router: Router) {
    router.route('/')
        .get(({}: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.photo.GetPhotoRequest =
              new huskysoft.gotagme.photo.GetPhotoRequest({
                page: 1,
              });
          this._photoAPI.getPhotos(request)
              .then((response: huskysoft.gotagme.photo.GetPhotoResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              const request: huskysoft.gotagme.photo.InsertPhotosRequest =
                  new huskysoft.gotagme.photo.InsertPhotosRequest(req.body);
              this._photoAPI.postPhotos(request, req.user as User)
                  .then(
                      (response:
                           huskysoft.gotagme.photo.InsertPhotosResponse) => {
                        res.status(201).json(response);
                      })
                  .catch(next);
            })
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /**
   * Photo by ID routes.
   * GET /:id - Fetches an existing photo by id.
   * PUT /:id - Inserts or updates a photo by id. REQUIRES AUTHENTICATION.
   * DELETE /:id - Rejects a photo.
   *
   * GET /:id/tag/:tagID? - Fetches the details of a tag or all tags on a photo
   * if tagID is undefined.
   * POST /:id/tag/:tagID? - Updates a tag if an id is given or posts a new tag
   * if undefined.
   * DELETE /:id/tag/:tagID - Rejects a tag.
   * @param router The router for adding routes.
   */
  private attachIDRoutes(router: Router) {
    router.route('/:id')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.photo.GetPhotoRequest =
              new huskysoft.gotagme.photo.GetPhotoRequest({
                id: req.params.id,
              });
          this._photoAPI.getPhotos(request)
              .then((response: huskysoft.gotagme.photo.GetPhotoResponse) => {
                res.send(response);
              })
              .catch(next);
        })
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              const request: huskysoft.gotagme.photo.DeletePhotoRequest =
                  new huskysoft.gotagme.photo.DeletePhotoRequest({
                    id: req.params.id,
                  });
              this._photoAPI.deletePhoto(request)
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch(next);
            });

    router.route('/:id/tag/:tagID?')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagsRequest =
              new huskysoft.gotagme.tag.GetTagsRequest({
                tagID: req.params.tagID,
                photoID: req.params.id,
              });
          this._photoAPI.handleGetTag(request)
              .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              this._photoAPI.handlePostTag(req)
                  .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                    res.json(response);
                  })
                  .catch(next);
            })
        .put(Handlers.notImplemented)
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) => {
              this._photoAPI
                  .handleRejectTag(
                      new huskysoft.gotagme.tag.RejectTagRequest({
                        id: req.params.tagID,
                      }),
                      req.user as User)
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch(next);
            });
  }
}
