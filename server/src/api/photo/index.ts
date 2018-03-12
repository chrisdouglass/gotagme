// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';

import {PhotoRouterProvider} from './photo_router_provider';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createPhotoRouter(connection: Connection): Router {
  const photoAPI: PhotoRouterProvider = new PhotoRouterProvider(connection);
  const router: Router = photoAPI.router();
  router.use('/', router);
  return router;
}
