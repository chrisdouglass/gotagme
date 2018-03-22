// APIs for working with Tags.
import {Router} from 'express';
import {Connection} from 'mongoose';
import {TagRouterProvider} from './tag_router_provider';

/**
 * Creates a new router to be used for the tag APIs.
 * @param connection The mongoose connection to use for tag routes.
 * @returns A new router figured for the tag routes.
 */
export function createTagRouter(connection: Connection): Router {
  const tagAPI: TagRouterProvider = new TagRouterProvider(connection);
  const router: Router = tagAPI.router();
  return router;
}
