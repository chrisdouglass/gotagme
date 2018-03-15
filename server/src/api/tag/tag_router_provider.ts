import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {CostumeStore} from '../../store/costume.store';
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
        new UserStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);

    // Make every other request a 403.
    router.use('/', Handlers.notAllowed);
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
