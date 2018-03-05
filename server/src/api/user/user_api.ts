import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {User, UserIDMap} from '../../model/user/user';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';

// CRUD operations for Users
const router = Router();

const connection: Connection|undefined = undefined;

router.route('/')
    .get((req: Request, res: Response, next: NextFunction) => {
      const userID = req.query.user_id;
      if (!userID) {
        return next(new ResponseError(400, 'No ID in request'));
      }
      const store: UserStore = new UserStore(connection!);
      store.userForUserID(userID)
          .then((user: User|null) => {
            if (!user) {
              next(new ResponseError(404, 'User not found.'));
            }
            res.send(user);
          })
          .catch(next);
    })
    .put(Handlers.notImplemented)
    .post(Handlers.notImplemented)
    .delete(Handlers.notImplemented);

router.route('/all')
    .get(({}, res: Response, next: NextFunction) => {
      const store: UserStore = new UserStore(connection!);
      store.fetchAll()
          .then((users: User[]) => {
            const userMap =
                users.reduce<UserIDMap>((map: UserIDMap, user: User) => {
                  map[user.userID] = user;
                  return map;
                }, {} as UserIDMap);
            res.send(userMap);
          })
          .catch(next);
    })
    .put(Handlers.notImplemented)
    .post(Handlers.notImplemented)
    .delete(Handlers.notImplemented);


// Make every other request a 403.
router.use('/', ({}, {}, next: NextFunction) => {
  next(new ResponseError(403, 'Not Allowed'));
});

module.exports = router;
