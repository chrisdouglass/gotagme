import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {User, UserIDMap} from '../../model/user/user';
import {UserStore} from '../../store/user.store';
import {API} from '../shared/api';
import {Handlers} from '../shared/handlers';

export class UserAPI implements API {
  private _router?: Router;
  private _connection: Connection;

  /**
   * @constructor
   * @param connection The mongoose connection to use for Twitter OAuth.
   */
  constructor(connection: Connection) {
    this._connection = connection;
  }

  router(): Router {
    if (this._router) {
      return this._router;
    }

    this._router = Router();
    this.attachRoutes(this._router);
    return this._router;
  }

  private attachRoutes(router: Router) {
    this.attachBaseRoute(router);
    this.attachAllRoute(router);
  }

  private attachBaseRoute(router: Router) {
    router.route('/')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this.baseGetRouteHandler(req, res, next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  private attachAllRoute(router: Router) {
    router.route('/all')
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
        const userID = req.query.user_id;
        if (!userID) {
          return next(new ResponseError(400, 'No ID in request'));
        }
        const store: UserStore = new UserStore(this._connection);
        const user: User|null = await store.userForUserID(userID);
        if (!user) {
          return next(new ResponseError(404, 'User not found.'));
        }
        res.json(user.model);
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
