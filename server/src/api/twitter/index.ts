// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';
import {TwitterRegistrationRouterProvider} from './twitter_registration_router_provider';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createTwitterRegistrationRouter(connection: Connection):
    Router {
  const twitterAPI: TwitterRegistrationRouterProvider =
      new TwitterRegistrationRouterProvider(connection);
  const router: Router = twitterAPI.router();
  router.use('/', router);
  return router;
}
