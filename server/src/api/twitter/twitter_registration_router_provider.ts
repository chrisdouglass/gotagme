import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {JWT, ResponseError} from '../../common/types';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

import {TokenResponse, TwitterOAuthProvider} from './twitter_oauth_provider';
import {TwitterUserRegistration} from './twitter_user_registration';

/** Creates a router for the Twitter registration API. */
export class TwitterRegistrationRouterProvider extends RouterProvider {
  private _twitterOAuth?: TwitterUserRegistration;

  /**
   * @constructor
   * @param connection The mongoose connection to use for Twitter OAuth.
   */
  constructor(connection: Connection) {
    super();
    this._twitterOAuth =
        new TwitterUserRegistration(connection, new TwitterOAuthProvider());
  }

  attachRoutes(router: Router) {
    this.attachBaseRoute(router);
    this.attachReplyRoute(router);
  }

  /**
   * Base routes.
   * GET / - Fetches a Twitter OAuth request token.
   * @param router The router for adding routes.
   */
  private attachBaseRoute(router: Router) {
    router.route('/')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this.baseGetRouteHandler(req, res, next))
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /**
   * Twitter's OAuth reply route.
   * GET /reply/ - The return endpoint for Twitter to invoke with the result
   * auth keys.
   * @param router The router for adding routes.
   */
  private attachReplyRoute(router: Router) {
    router.route('/reply/')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this.replyGetRouteHandler(req, res, next))
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
