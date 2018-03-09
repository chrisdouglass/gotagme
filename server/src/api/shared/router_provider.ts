import {Router} from 'express';

/** Objects which provide a router can implement this protocol. */
export interface RouterProvider {
  /** @returns A new router. */
  router(): Router;
}
