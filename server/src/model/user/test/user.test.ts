require('dotenv').load();  // Load env as early as possible.

import {should, use} from 'chai';

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {Connection} from 'mongoose';
import {suite, test} from 'mocha-typescript';
import {UserStore} from '../../../store/user.store';
import {User} from '../../../model/user';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class UserTest {
  private static _connection: Connection;
  private _store!: UserStore;

  static before() {
    should();                    // Enables chai should.
    use(require('dirty-chai'));  // For allowing chai function calls.

    UserTest._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
  }

  async before() {
    this._store = new UserStore(this.connection);
  }

  @test
  async createJWT() {
    const user: User|null =
        await this._store.userForOAuthKeys('someKey', 'someSecret', true);
    const jwt: string = user!.createJWT();
    jwt.length.should.be.greaterThan(0);
  }

  private get connection(): Connection {
    if (!UserTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return UserTest._connection;
  }

  async after() {
    return this.connection.dropDatabase();
  }

  static async after() {
    return UserTest._connection.close();
  }
}
