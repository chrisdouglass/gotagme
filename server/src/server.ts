import path = require('path');
import http = require('http');
import favicon = require('serve-favicon');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import compression = require('compression');

import express = require('express');

export class App {
  private app: express.Application;
  private environment: string;
  private port: string;

  constructor(NODE_ENV: 'development', SERVER_PORT: '3000') {
    this.environment = process.env.NODE_ENV || NODE_ENV;
    this.port = process.env.SERVER_PORT || SERVER_PORT;
    
    this.app = express();
  }

  setup() {
    this.configureForEnvironment();
    this.configurePassport();
    // TODO: Add Helmet for prod.
    this.configureBodyParser();
    this.configureFavicon();
    this.buildRoutes();
    this.configureErrorHandlers();
  }

  configureForEnvironment() {
    if(this.environment === 'development') {
      this.app.use(morgan('dev'));
    }else{
      this.app.use(compression());
    }
  }

  configurePassport() {
    require('./config/passport')(this.app);
  }

  configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }

  configureFavicon() {
    // TODO: Correct name and environment.
    // this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
  }

  buildRoutes() {
    const api = require('./routes/api');
    this.app.use('/api', api);

    this.app.get('*', (req, res, next) => {
      next(new Error('Not allowed.'));
    });
  }

  configureErrorHandlers() {
    require('./config/error')(this.app);
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`The server is running. Port: ${this.port}`);
    });
  }
}




// express-session setup.
// require('./build/config/session')(app);

// Passport setup.
// require('./build/config/passport')(app);



// Configure app-wide middleware.
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));

// app.use(express.static(path.join(__dirname, 'dist')));

// Routes.
// const api = require('./build/routes/api');
// app.use('/api', api);

// // Catch all other routes and return the index file
// app.get('*', (req, res, next) => {
//   next(new Error('Not allowed.'));
//   // res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

// // Error Handlers
// require('./build/config/error')(app);

// Create HTTP server and listen on provided port on all network interfaces.
// const server = http.createServer(app);
// const port = '3000';
// app.set('port', port);
// server.listen(port, () => console.log(`API running on localhost:${port}`));
