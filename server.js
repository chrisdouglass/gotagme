require('dotenv').load(); // Load env as early as possible.

// Set the promises used by Mongoose.
require('mongoose').Promise = require('bluebird');

const express = require('express');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// express-session setup.
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

// TODO: Add Helmet for prod.

// Configure app-wide middleware.
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

// Routes.
const api = require('./server/routes/api');
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Error Handlers
// Development Error Handler - Prints Stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
  });
}

// Production Error Handler - No Stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(err);
});

/**
 * Get port from environment and store in Express.
 */
const port = '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
