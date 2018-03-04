require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {UserStore} from '../../src/store/user.store';
import {User} from '../../src/model/user/user';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class UserTest {
  private _connection: mongoose.Connection;
  private _store: UserStore;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new UserStore(this._connection);
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new UserStore(this._connection);
  }

  @test
  async createJWT() {
    const user: User|null =
        await this._store.userForOAuthKeys('someKey', 'someSecret', true);
    const jwt: string = user!.createJWT();
    jwt.length.should.be.greaterThan(0);
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}