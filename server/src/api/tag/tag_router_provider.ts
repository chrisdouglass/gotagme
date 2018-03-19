import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {FlickrFetcher} from '../../flickr/flickr_fetcher';
import {ApprovalStore} from '../../store/approval.store';
import {CostumeStore} from '../../store/costume.store';
import {FlickrPhotoStore} from '../../store/flickr_photo.store';
import {PhotoStore} from '../../store/photo.store';
import {TagStore} from '../../store/tag.store';
import {UserStore} from '../../store/user.store';
import {PhotoAPI} from '../photo/photo_router_provider';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class TagRouterProvider extends RouterProvider {
  private _photoAPI: PhotoAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection) {
    super();
    const tagStore: TagStore = new TagStore(connection);
    this._photoAPI = new PhotoAPI(
        new PhotoStore(connection), tagStore, new CostumeStore(connection),
        new UserStore(connection), new ApprovalStore(connection),
        FlickrFetcher.default(), new FlickrPhotoStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
  }

  attachBaseRoutes(router: Router) {
    router.route('/:tagID?')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handleGetTagByID(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handlePostTag(req, res).catch(next))
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handleRejectTag(req, res).catch(next));
  }
}
