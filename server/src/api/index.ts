// Manages all API routes.
import {Application} from 'express';
import {Router} from 'express';
import {Connection} from 'mongoose';

import {createCostumeRouter} from './costume';
import {createPhotoRouter} from './photo';
import {createSearchRouter} from './search';
import {createTagRouter} from './tag';
import {createTwitterRegistrationRouter} from './twitter';
import {createUserRouter} from './user';


export function attachRoutesToAppWithConnection(
    app: Application, connection: Connection) {
  const userRouter: Router = createUserRouter(connection);
  app.use('/api/user', userRouter);

  const photoRouter: Router = createPhotoRouter(connection);
  app.use('/api/photo', photoRouter);

  const twitterRouter: Router = createTwitterRegistrationRouter(connection);
  app.use('/api/twitter', twitterRouter);

  const costumeRouter: Router = createCostumeRouter(connection);
  app.use('/api/costume', costumeRouter);

  const tagRouter: Router = createTagRouter(connection);
  app.use('/api/tag', tagRouter);

  const searchRouter: Router = createSearchRouter(connection);
  app.use('/api/search', searchRouter);

  // TODO: Convert routes to use new TS models.
  /*
  const flickr = require('./flickr');
  router.use('/flickr', flickr);

  const photo = require('./photo');
  router.use('/photo', photo);
  */
}
