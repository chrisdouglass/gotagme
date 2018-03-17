// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';
import {UserRouterProvider} from './user_router_provider';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createUserRouter(connection: Connection): Router {
  const userAPI: UserRouterProvider = new UserRouterProvider(connection);
  const router: Router = userAPI.router();
  return router;
}
