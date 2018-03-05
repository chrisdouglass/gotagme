// Manages all API routes.
import {Application} from 'express';
import {Router} from 'express-serve-static-core';
import {Connection} from 'mongoose';

import {createUserRouter} from './user/index';

export function attachRoutesToAppWithConnection(
    app: Application, connection: Connection) {
  const userRouter: Router = createUserRouter(connection);
  app.use('/api/user', userRouter);

  // TODO: Convert routes to use new TS models.
  /*
  const flickr = require('./flickr');
  router.use('/flickr', flickr);

  const photo = require('./photo');
  router.use('/photo', photo);
  */
}
