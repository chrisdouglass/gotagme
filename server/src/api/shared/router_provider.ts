import {Router} from 'express';

/** Objects which provide a router can implement this protocol. */
export abstract class RouterProvider {
  private _router?: Router;

  /** @returns A new router. */
  router(): Router {
    if (this._router) {
      return this._router;
    }

    this._router = Router();
    this.attachRoutes(this._router);
    return this._router;
  }

  abstract attachRoutes(router: Router): void;
}
