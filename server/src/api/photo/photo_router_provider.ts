import {NextFunction, Request, Response, Router} from 'express';

import {ResponseError} from '../../common/types';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

/** Creates a router configured with the Photo API endpoints. */
export class PhotoRouterProvider implements RouterProvider {
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

    // Make every other request a 403.
    router.use('/', Handlers.notAllowed);
  }

  /**
   * Base routes.
   * PUT / - Updates an existing photo. REQUIRES AUTHENTICATION.
   * @param router The router for adding routes.
   */
  private attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .put(Handlers.basicAuthenticate, this.putPhoto)
        .delete(Handlers.notImplemented);
  }

  /**
   * Photo by ID routes.
   * GET /:id - Fetches an existing photo by id.
   * POST /:id - Inserts or updates a new photo by id. REQUIRES AUTHENTICATION.
   * @param router The router for adding routes.
   */
  private attachIDRoutes(router: Router) {
    router.route('/:id')
        .get(this.getPhoto)
        .post(Handlers.basicAuthenticate, this.postPhoto)
        .put(Handlers.notImplemented)
        .delete(Handlers.basicAuthenticate, Handlers.notImplemented);
  }

  /**
   * GET API for adding a Photo.
   */
  getPhoto({}: Request, {}: Response, next: NextFunction) {
    next(new ResponseError(501, 'Not implemented.'));
  }

  /**
   * PUT API for updating an existing Photo.
   */
  putPhoto({}: Request, {}: Response, next: NextFunction) {
    next(new ResponseError(501, 'Not implemented.'));
  }

  /**
   * POST API for creating or updating a new Photo.
   */
  postPhoto({}: Request, {}: Response, next: NextFunction) {
    next(new ResponseError(501, 'Not implemented.'));
  }
}
