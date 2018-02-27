import bodyParser = require('body-parser');
import compression = require('compression');
import express = require('express');
import helmet = require('helmet');
import morgan = require('morgan');

export class Server {
  private app: express.Application;
  private environment: string;
  private port: string;

  constructor(environment = 'development', port = '3000') {
    this.environment = environment;
    this.port = port;
    this.app = express();
  }

  setup() {
    this.configureHelmet();
    this.configureForEnvironment();
    this.configurePassport();
    this.configureBodyParser();
    this.configureFavicon();
    this.buildRoutes();
    this.configureErrorHandlers();
  }

  configureForEnvironment() {
    if (this.environment === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(compression());
    }
  }

  configurePassport() {
    require('./config/passport')(this.app);
  }

  configureHelmet() {
    // TODO: Consider adding public key pinning if needed.
    this.app.use(helmet());
    this.app.use(helmet.referrerPolicy({policy: 'same-origin'}));
  }

  configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: false}));
  }

  configureFavicon() {
    // TODO: Implement favicon.
  }

  buildRoutes() {
    const api = require('../api');
    this.app.use('/api', api);

    this.app.get('*', ({}, {}, next) => {
      next(new Error('Not allowed.'));
    });
  }

  configureErrorHandlers() {
    require('./config/error')(this.app);
  }

  start() {
    this.app.listen(3000, () => {
      console.log(`The server is running. Port: ${this.port}`);
    });
  }
}
