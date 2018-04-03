require('dotenv').load();  // Load env as early as possible.

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import * as bodyParser from 'body-parser';
import * as chai from 'chai';
import * as spies from 'chai-spies';
chai.use(spies);
import * as request from 'supertest';
import * as express from 'express';
import {DBTest} from '../../common/test';
import {Application, Request, NextFunction} from 'express';
import {User} from '../../model/user';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class RouterTest extends DBTest {
  private _app!: Application;
  private _loggedInUser!: User;

  /**
   * Accessors.
   */

  get app(): Application {
    return this._app;
  }

  get loggedIn(): User {
    return this._loggedInUser;
  }

  /**
   * Before setup.
   */

  async before() {
    await super.before();
    this._loggedInUser = await this.createUser();
    this._app = express();
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: false}));
  }

  /**
   * Example test.
   */

  @test
  async testError() {
    await request(this._app).get('/').expect(404);
  }

  /**
   * Simple substitution for logging in.
   * @param req The request to mutate.
   * @param next The function to call to finish logging in.
   */
  authHandler(req: Request, {}, next: NextFunction) {
    req.user = this._loggedInUser;
    next();
  }
}
