import {Request, Response, Router} from 'express';
import {NextFunction} from 'express-serve-static-core';
import {verify as verifyJWT, VerifyOptions} from 'jsonwebtoken';
import {Connection} from 'mongoose';

import {ResponseError, StringAnyMap} from '../../common/types';
import {User} from '../../model/user';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class LoginRouterProvider extends RouterProvider {
  private _api: LoginAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection) {
    super();
    this._api = new LoginAPI(new UserStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachTokenRoutes(router);
  }

  /*
   * GET /
   */
  attachBaseRoutes(router: Router) {
    router.route('/')
        .get(({}, res: Response) => {
          res.redirect('/api/twitter');
        })
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /*
   * GET /token - Refreshes tokens.
   */
  attachTokenRoutes(router: Router) {
    router.route('/token')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetJWTFromRefresh(req, res, next).catch(next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

export class LoginAPI {
  constructor(
      private _userStore: UserStore,
  ) {}

  /**
   * Gets a new JWT for the user. The following must be true for a token to be
   * issued:
   * - The User has a current session and token.
   * - The refresh token matches the token in the User's current session.
   * - The existing JWT's User still exists.
   * @param req.query.jwt An existing JWT. It may be expired.
   * @param req.query.token The refresh token.
   */
  async handleGetJWTFromRefresh(
      req: Request, res: Response, next: NextFunction): Promise<void> {
    if (!req.query.jwt || !req.query.token) {
      return next(new ResponseError(403, 'Missing existing jwt or token'));
    }

    // Check if valid session.
    const sessionToken: string|undefined =
        req.session && req.session.token as string;
    if (!sessionToken) {
      return next(new ResponseError(403, 'No existing session'));
    }

    const newJWT: string|null = await this.createJWTIfValid(
        req.query.jwt, req.query.token, sessionToken);
    if (!newJWT) {
      return next(new ResponseError(401));
    }

    res.status(200).json(newJWT);
  }

  async createJWTIfValid(
      existingJWT: string, providedToken: string,
      sessionToken: string): Promise<string|null> {
    if (!existingJWT || !providedToken || !sessionToken) {
      return null;
    }

    // Verify token.
    if (providedToken !== sessionToken) {
      return null;
    }

    // Check if user still exists.
    const payload: StringAnyMap =
        verifyJWT(existingJWT, process.env.PASSPORT_JWT_SECRET, {
          ignoreExpiration: true,
        } as VerifyOptions) as StringAnyMap;
    const userID: string = payload.id;
    const user: User|null = await this._userStore.findOneByUserID(userID);
    if (!user) {
      return null;
    }

    return user.createJWT();
  }
}
