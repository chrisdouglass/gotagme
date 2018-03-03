// OAuth Registration API for users.
import * as express from 'express';
import {NextFunction, Request, Response} from 'express';
import * as passport from 'passport';

import {User} from '../../model/user/user';
import {Handlers} from '../shared/handlers';

const router = express.Router();

router.route('/')
    .all(({}: Request, {}: Response, next: NextFunction) => {
      next();
    })
    .get(passport.authenticate('twitter'))
    .post(Handlers.notImplemented)
    .put(Handlers.notImplemented)
    .delete(Handlers.notImplemented);

router.route('/reply/')
    .all(({}: Request, {}: Response, next: NextFunction) => {
      next();
    })
    .get(
        passport.authenticate('twitter'),
        (req: express.Request, res: express.Response) => {
          const user: User|undefined = req.user as User;
          res.json({token: user.createJWT()});
        })
    .post(Handlers.notImplemented)
    .put(Handlers.notImplemented)
    .delete(Handlers.notImplemented);

module.exports = router;
