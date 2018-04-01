// APIs for searching.
import {Router} from 'express';
import {Connection} from 'mongoose';
import {SearchRouterProvider} from './search-router-provider';

/**
 * Creates a new router to be used for the search APIs.
 * @param connection The mongoose connection to use for search routes.
 * @returns A new router figured for the search routes.
 */
export function createSearchRouter(connection: Connection): Router {
  const searchAPI: SearchRouterProvider = new SearchRouterProvider(connection);
  const router: Router = searchAPI.router();
  return router;
}
