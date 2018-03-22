// APIs for working with logging in.
import {Router} from 'express';
import {Connection} from 'mongoose';

import {LoginRouterProvider} from './login_router_provider';

/**
 * Creates a new router to be used for the login APIs.
 * @param connection The mongoose connection to use for login routes.
 * @returns A new router figured for the login routes.
 */
export function createLoginRouter(connection: Connection): Router {
  const loginAPI: LoginRouterProvider = new LoginRouterProvider(connection);
  const router: Router = loginAPI.router();
  return router;
}
