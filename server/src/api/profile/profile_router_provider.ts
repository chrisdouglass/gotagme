import {NextFunction, Request, Response, Router} from 'express';

import {User} from '../../model/user';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class ProfileRouterProvider extends RouterProvider {
  private _api: ProfileAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor() {
    super();
    this._api = new ProfileAPI();
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
  }

  /*
   * GET / - Gets the current user's profile.
   */
  attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetProfile(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

class ProfileAPI {

  constructor() {}

  /**
   * Gets the current user's profile.
   */
  async handleGetProfile(req: Request, res: Response): Promise<void> {
    const user: User|undefined = req.user as User;
    if (!user) {
      res.sendStatus(403);
      return;
    }
    res.json(user.toJSON());
  }
}
