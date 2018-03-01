require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {AccountDocument} from '../../src/model/account/account.document';
import {CostumeDocument} from '../../src/model/costume/costume.document';
import {UserDocument} from '../../src/model/user/user.document';
import {User} from '../../src/model/user/user';
import {UserStore} from '../../src/store/user.store';

@suite
export class UserStoreTest {
  private _connection: mongoose.Connection;
  private _store: UserStore;
  private _userDocument?: UserDocument;
  private _user?: User;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new UserStore(this._connection);
  }

  static before() {
    global.Promise = require('bluebird').Promise;
    mongoose.Promise = global.Promise;
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new UserStore(this._connection);
    const accounts = [

    ] as AccountDocument[];
    const costumes = [

    ] as CostumeDocument[];
    const document = {
      userID: 'someID',
      displayName: 'some name',
      accounts,
      costumes,
    } as UserDocument;
    this._userDocument = document;
    return this._store.create(document).then((user: User) => {
      user.should.exist('User was not created by store from document.');
      this._user = user;
    });
  }

  @test
  async userID() {
    if (!this._user || !this._userDocument) {
      throw new Error('Invalid user state.');
    }

    this._user.userID.should.equal(this._userDocument.userID);
  }

  @test
  async displayName() {
    if (!this._user || !this._userDocument || !this._user.displayName) {
      throw new Error('Invalid user state.');
    }

    this._user.displayName.should.equal(this._userDocument.displayName);
  }

  @test.skip
  async accounts() {}

  @test.skip
  async costumes() {}

  @test.skip
  async fetchAll() {}

  @test.skip
  async update() {}

  @test.skip
  async delete() {}

  @test.skip
  async findByID() {}

  @test.skip
  async findOne() {}

  @test.skip
  async find() {}

  async after() {
    this._userDocument = undefined;
    this._user = undefined;
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}
