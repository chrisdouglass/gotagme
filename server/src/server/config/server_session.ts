import * as express from 'express';

const setupSession = (app: express.Application) => {
  const session = require('express-session');
  const mongoStore = require('connect-mongo')(session);
  app.use(session({
    secret: process.env.SESSION_DB_SECRET,
    store: new mongoStore({
      url: process.env.SESSION_DB_URL,
      touchAfter: 24 * 3600  // Only update once per hour.
    }),
    saveUninitialized: false,
    resave: false,
  }));
};

module.exports = setupSession;
