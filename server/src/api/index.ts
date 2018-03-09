// Manages all API routes.
import {Application} from 'express';
import {Router} from 'express';
import {Connection} from 'mongoose';

import {createPhotoRouter} from './photo';
import {createTwitterRegistrationRouter} from './twitter';
import {createUserRouter} from './user';


export function attachRoutesToAppWithConnection(
    app: Application, connection: Connection) {
  const userRouter: Router = createUserRouter(connection);
  app.use('/api/user', userRouter);

  const photoRouter: Router = createPhotoRouter();
  app.use('/api/photo', photoRouter);

  const twitterRouter: Router = createTwitterRegistrationRouter(connection);
  app.use('/api/twitter', twitterRouter);

  // TODO: Convert routes to use new TS models.
  /*
  const flickr = require('./flickr');
  router.use('/flickr', flickr);

  const photo = require('./photo');
  router.use('/photo', photo);
  */
}
