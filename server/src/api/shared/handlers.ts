import {NextFunction, Request, RequestHandler, Response} from 'express';
import * as passport from 'passport';

import {ResponseError} from '../../common/types';

export class Handlers {
  static notImplemented: RequestHandler =
      ({}: Request, {}: Response, next: NextFunction) => {
        const error: ResponseError = new Error('Not Implemented');
        error.status = 501;
        next(error);
      }

  static basicAuthenticate: RequestHandler =
      passport.authenticate('jwt', {session: false});
}
