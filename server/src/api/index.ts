// Manages all API routes.
import {Application} from 'express';
import {Router} from 'express';
import {Connection} from 'mongoose';

import {createPhotoRouter} from './photo';
import {createUserRouter} from './user';


export function attachRoutesToAppWithConnection(
    app: Application, connection: Connection) {
  const userRouter: Router = createUserRouter(connection);
  app.use('/api/user', userRouter);

  const photoRouter: Router = createPhotoRouter();
  app.use('/api/photo', photoRouter);

  // TODO: Convert routes to use new TS models.
  /*
  const flickr = require('./flickr');
  router.use('/flickr', flickr);

  const photo = require('./photo');
  router.use('/photo', photo);
  */
}
