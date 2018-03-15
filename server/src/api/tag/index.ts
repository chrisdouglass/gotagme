// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';
import {TagRouterProvider} from './tag_router_provider';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createTagRouter(connection: Connection): Router {
  const tagAPI: TagRouterProvider = new TagRouterProvider(connection);
  const router: Router = tagAPI.router();
  router.use('/', router);
  return router;
}
