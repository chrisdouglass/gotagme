const setupSession = function(app) {
  const session = require('express-session');
  const MongoStore = require('connect-mongo')(session);
  app.use(session({
    secret: process.env.SESSION_DB_SECRET,
    store: new MongoStore({
      url: process.env.SESSION_DB_URL,
      touchAfter: 24 * 3600 // Only update once per hour.
    }),
    saveUninitialized: false,
    resave: false,
  }));
};

module.exports = setupSession;
