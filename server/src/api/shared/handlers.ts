import {NextFunction, RequestHandler} from 'express';
import * as passport from 'passport';

import {ResponseError} from '../../common/types';

export class Handlers {
  static notImplemented: RequestHandler =
      ({}, {}, next: NextFunction) => {
        next(new ResponseError(501, 'Not Implemented'));
      }

  static notAllowed: RequestHandler =
      ({}, {}, next: NextFunction) => {
        next(new ResponseError(403, 'Not Allowed'));
      }

  static basicAuthenticate: RequestHandler =
      passport.authenticate('jwt', {session: false});
}
