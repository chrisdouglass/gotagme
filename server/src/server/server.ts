// import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import {NextFunction, Response} from 'express';
import * as ExpressFormidable from 'express-formidable';
import * as helmet from 'helmet';
import {Connection, createConnection} from 'mongoose';
import * as morgan from 'morgan';

import {attachRoutesToAppWithConnection} from '../api';

import {setupCORS} from './config/cors';
import {setupErrorHandlers} from './config/error';
import {setupPassport} from './config/passport';

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
    this.configureCORS();
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
    if (!this._mongooseConnection) {
      throw new Error('No DB connection when trying to configure passport.');
    }
    setupPassport(this._app, this._mongooseConnection);
  }

  configureHelmet() {
    // TODO: Consider adding public key pinning if needed.
    this._app.use(helmet());
    this._app.use(helmet.referrerPolicy({policy: 'same-origin'}));
  }

  configureBodyParser() {
    this._app.use(ExpressFormidable());
  }

  configureCORS() {
    setupCORS(this._app);
  }

  configureFavicon() {
    this._app.get('/favicon.ico', ({}, res: Response) => {
      res.status(204);
    });
  }

  buildRoutes() {
    if (!this._mongooseConnection) {
      throw new Error('No connection when trying to build routes.');
    }
    attachRoutesToAppWithConnection(this._app, this._mongooseConnection);

    this._app.get('*', ({}, {}, next: NextFunction) => {
      next(new Error('Not allowed.'));
    });
  }

  configureErrorHandlers() {
    setupErrorHandlers(this._app);
  }

  start() {
    this._app.listen(this._port, () => {
      console.log(`The server is running. Port: ${this._port}`);
    });
  }
}
