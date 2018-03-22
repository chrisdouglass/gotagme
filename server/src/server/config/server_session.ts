import {Application} from 'express';
import {Connection} from 'mongoose';

export function setupSession(app: Application, conn: Connection) {
  // TODO: Modern imports.
  const session = require('express-session');
  const mongoStore = require('connect-mongo')(session);
  app.use(session({
    secret: process.env.SESSION_DB_SECRET,
    store: new mongoStore({
      mongooseConnection: conn,
      ttl: 2 * 24 * 60 * 60,  // = 2 days.
    }),
    saveUninitialized: false,
    resave: false,
  }));
}
