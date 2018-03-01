import * as assert from 'assert';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import * as helmet from 'helmet';
import {Connection, createConnection} from 'mongoose';
import * as morgan from 'morgan';

export class Server {
  private _app: express.Application;
  private _environment: string;
  private _port: string;
  private _mongooseConnection?: Connection;

  constructor(environment = 'development', port = '3000') {
    this._environment = environment;
    this._port = port;
    this._app = express();
  }

  setup() {
    this.connectMongoose();
    this.configureHelmet();
    this.configureForEnvironment();
    this.configurePassport();
    this.configureBodyParser();
    this.configureFavicon();
    this.buildRoutes();
    this.configureErrorHandlers();
  }

  connectMongoose() {
    this._mongooseConnection =
        createConnection(process.env.DB_URL, {useMongoClient: true});
  }

  configureForEnvironment() {
    if (this._environment === 'development') {
      this._app.use(morgan('dev'));
    } else {
      this._app.use(compression());
    }
  }

  configurePassport() {
    assert(this._mongooseConnection);
    require('./config/passport')(this._app, this._mongooseConnection);
  }

  configureHelmet() {
    // TODO: Consider adding public key pinning if needed.
    this._app.use(helmet());
    this._app.use(helmet.referrerPolicy({policy: 'same-origin'}));
  }

  configureBodyParser() {
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: false}));
  }

  configureFavicon() {
    // TODO: Implement favicon.
  }

  buildRoutes() {
    const api = require('../api');
    this._app.use('/api', api);

    this._app.get('*', ({}, {}, next) => {
      next(new Error('Not allowed.'));
    });
  }

  configureErrorHandlers() {
    require('./config/error')(this._app);
  }

  start() {
    this._app.listen(this._port, () => {
      console.log(`The server is running. Port: ${this._port}`);
    });
  }
}
