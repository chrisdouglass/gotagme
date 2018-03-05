// OAuth Registration API for users.
import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {JWT, ResponseError} from '../../common/types';
import {API} from '../shared/api';
import {Handlers} from '../shared/handlers';
import {TokenResponse, TwitterOAuthProvider} from './twitter_oauth_provider';
import {TwitterUserRegistration} from './twitter_user_registration';


/** Creates a router for the Twitter registration API. */
export class RegisterAPI implements API {
  private _twitterOAuth?: TwitterUserRegistration;
  private _router?: Router;

  /**
   * @constructor
   * @param connection The mongoose connection to use for Twitter OAuth.
   */
  constructor(connection: Connection) {
    this._twitterOAuth =
        new TwitterUserRegistration(connection, new TwitterOAuthProvider());
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
    this.attachReplyRoute(router);
  }

  private attachBaseRoute(router: Router) {
    router.route('/')
        .get(this.baseGetRouteHandler)
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  private attachReplyRoute(router: Router) {
    router.route('/reply/')
        .get(this.replyGetRouteHandler)
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  private baseGetRouteHandler({}, res: Response, next: NextFunction) {
    if (!this._twitterOAuth) {
      next(new ResponseError(500, 'Twitter OAuth was unavailable.'));
      return;
    }
    this._twitterOAuth.fetchRequestTokens()
        .then((response: TokenResponse) => {
          res.json(response);
        })
        .catch(next);
  }

  private replyGetRouteHandler(
      req: Request, res: Response, next: NextFunction) {
    if (!this._twitterOAuth) {
      return next(new ResponseError(500, 'Twitter OAuth was unavailable.'));
    }
    this._twitterOAuth
        .registerToken(req.query.oauth_token, req.query.oauth_verifier)
        .then((jwt: JWT|undefined) => {
          if (!jwt) {
            return next(
                new ResponseError(500, 'Unable to generate a jwt tokens.'));
          }
          const encodedJWT: string = encodeURIComponent(jwt);
          res.redirect('/?jwt=' + encodedJWT);
        })
        .catch(next);
  }
}
