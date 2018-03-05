import {Router} from 'express';

/** Defines an API object for constructing API routes. */
export interface API {
  /**
   * @returns A new router configured for the registration route.
   */
  router(): Router;
}
