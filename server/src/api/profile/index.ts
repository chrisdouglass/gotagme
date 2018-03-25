// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';

import {ProfileRouterProvider} from './profile_router_provider';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createProfileRouter(connection: Connection): Router {
  const profileAPI: ProfileRouterProvider =
      new ProfileRouterProvider(connection);
  const router: Router = profileAPI.router();
  return router;
}
