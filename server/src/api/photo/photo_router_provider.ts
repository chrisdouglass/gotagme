import {Request, Response, Router} from 'express';
import {Connection} from 'mongoose';
import {parse as parseURL} from 'url';

import {ResponseError} from '../../common/types';
import {Photo} from '../../model/photo';
import {User} from '../../model/user/user';
import {PhotoStore} from '../../store/photo.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

/** Creates a router configured with the Photo API endpoints. */
export class PhotoRouterProvider extends RouterProvider {
  private _store: PhotoStore;

  constructor(connection: Connection) {
    super();
    this._store = new PhotoStore(connection);
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachIDRoutes(router);

    // Make every other request a 403.
    router.use('/', Handlers.notAllowed);
  }

  /**
   * Base routes.
   * POST / - Inserts a photo by the flickrURL parameter. REQUIRES
   * AUTHENTICATION.
   * @param router The router for adding routes.
   */
  private attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.notImplemented)
        .post(
            Handlers.basicAuthenticate,
            (req: Request, res: Response) => this.postPhoto(req, res))
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /**
   * Photo by ID routes.
   * GET /:id - Fetches an existing photo by id.
   * PUT /:id - Inserts or updates a photo by id. REQUIRES AUTHENTICATION.
   * DELETE /:id - Removes a photo.
   * @param router The router for adding routes.
   */
  private attachIDRoutes(router: Router) {
    router.route('/:id')
        .get(this.getPhoto)
        .post(Handlers.notImplemented)
        .put(
            Handlers.basicAuthenticate,
            (req: Request, res: Response) => this.putPhoto(req, res))
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response) => this.deletePhoto(req, res));
  }

  /**
   * GET API for adding a Photo.
   */
  getPhoto({}: Request, {}: Response) {
    throw new ResponseError(501, 'Not implemented.');
  }

  /**
   * PUT API for updating an existing Photo.
   */
  putPhoto({}: Request, {}: Response) {
    throw new ResponseError(501, 'Not implemented.');
  }

  /**
   * POST API for creating or updating a new Photo.
   */
  async postPhoto(req: Request, res: Response) {
    const flickrURLString: string|undefined = req.body.flickrURL;
    if (!flickrURLString) {
      throw new Error('No flickr URL provided.');
    }
    const user: User|undefined = req.user as User;
    if (!user) {
      throw new Error('Not logged in.');
    }
    const photo: Photo = await this._store.photoFromFlickrURLAndUser(
        parseURL(flickrURLString), user);
    res.status(201).json(photo);
  }

  /**
   * DELETE API for removing a Photo.
   */
  async deletePhoto(req: Request, res: Response) {
    const photoID: string|undefined = req.params.id;
    if (!photoID) {
      throw new Error('No ID given.');
    }
    const photo: Photo|null = await this._store.findByPhotoID(photoID);
    if (!photo) {
      throw new ResponseError(404, 'Photo not found');
    }
    await this._store.delete(photo);
    res.send(200);
  }
}
