import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {User, UserIDMap} from '../../model/user';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class UserRouterProvider extends RouterProvider {
  private _connection: Connection;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection) {
    super();
    this._connection = connection;
  }

  attachRoutes(router: Router) {
    this.attachBaseRoute(router);
    this.attachAllRoute(router);
  }

  /**
   * Base routes.
   * GET /:id - Fetches an existing user by id.
   * @param router The router for adding routes.
   */
  private attachBaseRoute(router: Router) {
    router.route('/:id')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this.baseGetRouteHandler(req, res, next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /**
   * All Users routes.
   * GET / - Fetches all registered users.
   * @param router The router for adding routes.
   */
  private attachAllRoute(router: Router) {
    router.route('/')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this.allGetRouteHandler(req, res, next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  private baseGetRouteHandler(req: Request, res: Response, next: NextFunction) {
    (async () => {
      try {
        const userID = req.params.id;
        if (!userID) {
          return next(new ResponseError(400, 'No ID in request'));
        }
        const store: UserStore = new UserStore(this._connection);
        const user: User|null = await store.findOneByUserID(userID);
        if (!user) {
          return next(new ResponseError(404, 'User not found.'));
        }
        res.json(user);
      } catch (error) {
        next(error);
      }
    })();
  }

  private allGetRouteHandler({}: Request, res: Response, next: NextFunction) {
    (async () => {
      try {
        const store: UserStore = new UserStore(this._connection);
        const users: User[] = await store.fetchAll();
        const userMap =
            users.reduce<UserIDMap>((map: UserIDMap, user: User) => {
              map[user.userID] = user;
              return map;
            }, {} as UserIDMap);
        res.send(userMap);
      } catch (error) {
        next(error);
      }
    })();
  }
}
