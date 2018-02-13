require('dotenv').load(); // Load env as early as possible.

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
// const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// express-session setup.
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: 'poop',
  store: new MongoStore({
    url: process.env.SESSION_DB_URL,
    touchAfter: 24 * 3600 // Only update once per hour.
  }),
  saveUninitialized: false,
  resave: false,
}));

// TODO: Add Helmet for prod.

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Configure app-wide middlewear.
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes.
const routes = require('./routes');
app.use('/', routes);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handlers
// Development Error Handler - Prints Stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production Error Handler - No Stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
