// OAuth Registration API for users.
import * as express from 'express';
import {NextFunction, Request, Response} from 'express';

import {Handlers} from '../shared/handlers';
import {TokenResponse, TwitterFetcher} from '../twitter/twitter_fetcher';

const router = express.Router();

router.route('/')
    .get(({}: Request, res: Response, next: NextFunction) => {
      TwitterFetcher.fetchRequestTokens()
          .then((response: TokenResponse) => {
            res.json(response);
          })
          .catch(next);
    })
    .post(Handlers.notImplemented)
    .put(Handlers.notImplemented)
    .delete(Handlers.notImplemented);

router.route('/reply/')
    .get((req: Request, res: Response, next: NextFunction) => {
      TwitterFetcher
          .fetchAccessTokens(req.query.oauth_token, req.query.oauth_verifier)
          .then((response: TokenResponse) => {
            res.json(response);
          })
          .catch(next);
    })
    .post(Handlers.notImplemented)
    .put(Handlers.notImplemented)
    .delete(Handlers.notImplemented);

module.exports = router;
