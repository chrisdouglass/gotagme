require('dotenv').load();  // Load env as early as possible.

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {UserStore} from '../../../store/user.store';
import {User} from '../../../model/user';
import {DBTest} from '../../../common/test';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class UserTest extends DBTest {
  private _store!: UserStore;

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

  async after() {
    return this.connection.dropDatabase();
  }
}
