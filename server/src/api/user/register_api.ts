// OAuth Registration API for users.
import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import {Router} from 'express';
import {Connection} from 'mongoose';

import {JWT} from '../../common/types';
import {Handlers} from '../shared/handlers';
import {TokenResponse, TwitterOAuth} from '../twitter/twitter_oauth';

/** Creates a router for the Twitter registration API. */
export class RegisterAPI {
  private _twitterOAuth: TwitterOAuth;
  private _router?: Router;

  /**
   * @constructor
   * @param connection The mongoose connection to use for Twitter OAuth.
   */
  constructor(connection: Connection) {
    this._twitterOAuth = new TwitterOAuth(connection);
  }

  /**
   * @returns A new router configured for the registration route.
   */
  get router() {
    if (this._router) {
      return this._router;
    }

    this._router = express.Router();
    this.attachRoutes(this._router);
    return this._router;
  }

  private attachRoutes(router: express.Router) {
    this.attachBaseRoute(router);
    this.attachReplyRoute(router);
  }

  private attachBaseRoute(router: express.Router) {
    router.route('/')
        .get(({}: Request, res: Response, next: NextFunction) => {
          this._twitterOAuth.fetchRequestTokens()
              .then((response: TokenResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  private attachReplyRoute(router: express.Router) {
    router.route('/reply/')
        .get((req: Request, res: Response, next: NextFunction) => {
          (async(): Promise<void> => {
            const jwt: JWT|undefined = await this._twitterOAuth.registerToken(
                req.query.oauth_token, req.query.oauth_verifier);
            if (!jwt) {
              next(Error('Unable to generate a jwt tokens.'));
              return;
            }
            const encodedJWT: string = encodeURIComponent(jwt);
            res.redirect('/?jwt=' + encodedJWT);
          })();
        })
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}
