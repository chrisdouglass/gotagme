require('dotenv').load();  // Load env as early as possible.

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
// require('./server/src/config/session')(app);

// Passport setup.
require('./src/config/passport')(app);

// TODO: Add Helmet for prod.

// Configure app-wide middleware.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist')));

// Routes.
const api = require('./src/routes/api');
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res, next) => {
  next(new Error('Not allowed.'));
  // res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Error Handlers
require('./src/config/error')(app);

// Create HTTP server and listen on provided port on all network interfaces.
const server = http.createServer(app);
const port = '3000';
app.set('port', port);
server.listen(port, () => console.log(`API running on localhost:${port}`));
