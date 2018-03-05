import {NextFunction, Request, Response, Router} from 'express';

import {API} from '../shared/api';
import {Handlers} from '../shared/handlers';

/** Creates a router configured with the Photo API endpoints. */
export class PhotoAPI implements API {
  private _router?: Router;

  /**
   * Creates a router configured with the Photo API endpoints.
   * @returns The new express Router.
   */
  router(): Router {
    if (this._router) {
      return this._router;
    }

    this._router = Router();
    this.attachRoutes(this._router);
    return this._router;
  }

  private attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachIDRoutes(router);
  }

  private attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .put(Handlers.basicAuthenticate, this.putPhoto)
        .delete(Handlers.notImplemented);
  }

  private attachIDRoutes(router: Router) {
    router.route('/:id')
        .get(this.getPhoto)
        .post(Handlers.basicAuthenticate, this.postPhoto)
        .put(Handlers.notImplemented)
        .delete(Handlers.basicAuthenticate, Handlers.notImplemented);
  }

  /**
   * GET API for adding a new Photo.
   */
  getPhoto({}: Request, {}: Response, {}: NextFunction) {}

  /**
   * PUT API for adding a new Photo.
   */
  putPhoto({}: Request, {}: Response, {}: NextFunction) {}

  /**
   * POST API for adding a new Photo.
   */
  postPhoto({}: Request, {}: Response, {}: NextFunction) {}
}
