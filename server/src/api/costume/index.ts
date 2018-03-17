// APIs for working with Users.
import {Router} from 'express';
import {Connection} from 'mongoose';
import {CostumeRouterProvider} from './costume_router_provider';

/**
 * Creates a new router to be used for the user APIs.
 * @param connection The mongoose connection to use for user routes.
 * @returns A new router figured for the user routes.
 */
export function createCostumeRouter(connection: Connection): Router {
  const costumeAPI: CostumeRouterProvider =
      new CostumeRouterProvider(connection);
  const router: Router = costumeAPI.router();
  return router;
}
