// APIs for working with Photos.
import {Router} from 'express';
import {Connection} from 'mongoose';

import {PhotoRouterProvider} from './photo_router_provider';

/**
 * Creates a new router to be used for the photo APIs.
 * @param connection The mongoose connection to use for photo routes.
 * @returns A new router figured for the photo routes.
 */
export function createPhotoRouter(connection: Connection): Router {
  const photoAPI: PhotoRouterProvider = new PhotoRouterProvider(connection);
  const router: Router = photoAPI.router();
  return router;
}
