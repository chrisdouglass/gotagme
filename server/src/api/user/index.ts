// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';

import {RegisterAPI} from './register_api';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createUserRouter(connection: Connection): Router {
  const registerAPI: RegisterAPI = new RegisterAPI(connection);
  const router: Router = registerAPI.router();
  router.use('/register', router);
  return router;
}
