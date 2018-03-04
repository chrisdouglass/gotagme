// Manages all API routes.
import {Application} from 'express';
import {Router} from 'express-serve-static-core';
import {Connection} from 'mongoose';

import {createUserRouter} from './user/index';

export function attachRoutesToAppWithConnection(
    app: Application, connection: Connection) {
  const userRouter: Router = createUserRouter(connection);
  app.use('/api/user', userRouter);
}
// Connect to MongoDB before loading any model classes.
// const mongoose = require('mongoose');
// mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// User management and registration.

// const user: Function(connection: Connection): require('./user');
// router.use('/user', user);

// TODO: Convert routes to use new TS models.
/*
const flickr = require('./flickr');
router.use('/flickr', flickr);

const photo = require('./photo');
router.use('/photo', photo);
*/
