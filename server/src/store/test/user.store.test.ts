require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {Connection} from 'mongoose';
import {suite, test} from 'mocha-typescript';
import {UserDocument, User} from '../../../src/model/user';
import {UserStore} from '../../../src/store/user.store';
import {Account, AccountDocument} from '../../../src/model/account';
import {Costume, CostumeDocument} from '../../../src/model/costume';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
// TODO: Expand test to test multiple users in the DB.
export class UserStoreTest {
  private static _connection: Connection;
  private _store!: UserStore;
  private _userDocument!: UserDocument;
  private _user!: User;

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.

    UserStoreTest._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
  }

  async before() {
    this._store = new UserStore(this.connection);
    const accounts: AccountDocument[] = [
      this.createAccountDocumentWithTestID('ElonMusk'),
      this.createAccountDocumentWithTestID('BruceWayne'),
    ];
    const costumes: CostumeDocument[] = [
      this.createCostumeDocumentWithTestID('SunnyDingo'),
      this.createCostumeDocumentWithTestID('Batman'),
    ];
    const document: UserDocument = {
      userID: 'someID',
      displayName: 'some name',
      accounts,
      costumes,
    } as UserDocument;
    this._userDocument = document;
    return this._store.create(this._userDocument).then((user: User) => {
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

  @test.skip  // TODO: Implement Account::isEqual then enable this test.
  async accounts() {
    if (!this._user || !this._userDocument) {
      throw new Error('Invalid user state.');
    }

    const expected: AccountDocument[] = this._userDocument.accounts;
    const actual: Account[] = this._user.accounts;

    actual.length.should.equal(expected.length);

    for (let i = 0; i < this._user.accounts.length; i++) {
      const actualAccount: Account = actual[i];
      const expectedDocument: AccountDocument = expected[i];
      chai.assert(actualAccount.isEqual(expectedDocument));
    }
  }

  @test.skip  // TODO: Implement Costume::isEqual then enable this test.
  async costumes() {
    if (!this._user || !this._userDocument || !this._userDocument.costumes) {
      throw new Error('Invalid user state.');
    }

    const expected: CostumeDocument[] = this._userDocument.costumes;
    const actual: Costume[]|undefined = this._user.costumes;
    if (!actual) {
      throw new Error('Costumes were expected.');
    }
    actual.length.should.equal(expected.length);

    for (let i = 0; i < this._user.accounts.length; i++) {
      const actualCostume: Costume = actual[i];
      const expectedDocument: CostumeDocument = expected[i];
      chai.assert(actualCostume.isEqual(expectedDocument));
    }
  }

  @test.skip  // TODO: Implement.
  async update() {}

  @test
  async findOneByAccountTokensDirectly() {
    return this._store
        .findOne({
          'accounts.oauthToken': this._user.accounts[0].oauthToken,
          'accounts.oauthSecret': this._user.accounts[0].oauthSecret,
        })
        .then((user: User|null) => {
          chai.expect(user).to.exist('User was not found in the DB.');
        });
  }

  @test
  async userForOAuthKeys() {
    const user: User|null = await this._store.userForOAuthKeys(
        this._user.accounts[0].oauthToken, this._user.accounts[0].oauthSecret,
        false);
    chai.expect(user).to.exist('User was not found in the DB.');
  }

  @test
  async userForUserID() {
    const user: User|null = await this._store.userForUserID(this._user.userID);
    chai.expect(user).to.exist('User was not found in the DB.');
  }

  @test
  async createFromAccountTokens() {
    const newToken = 'newtoken';
    const newSecret = 'newsecret';
    return this._store.userForOAuthKeys(newToken, newSecret, true)
        .then((user: User|null) => {
          chai.expect(user).to.exist('User was not found in the DB.');
          user!.accounts.length.should.equal(1);
          user!.accounts[0].oauthToken.should.equal(newToken);
          user!.accounts[0].oauthSecret.should.equal(newSecret);
        });
  }

  @test
  async userForServerID() {
    return this._store.userForServerID(this._userDocument.accounts[0].serverID!)
        .then((user: User|null) => {
          chai.expect(user).to.exist('User was not found in the DB.');
          user!.userID.should.equal(this._user.userID);
        });
  }

  private get connection(): Connection {
    if (!UserStoreTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return UserStoreTest._connection;
  }

  async after() {
    return this.connection.dropDatabase();
  }

  static async after() {
    return UserStoreTest._connection.close();
  }

  createAccountDocumentWithTestID(id: string): AccountDocument {
    return {
      serverID: 'twitter' + id,
      oauthToken: 'token' + id,
      oauthSecret: 'secret' + id,
      displayName: 'display' + id,
      username: 'user' + id,
    } as AccountDocument;
  }

  createCostumeDocumentWithTestID(id: string): CostumeDocument {
    return {
      names: ['first' + id, 'second' + id, 'third' + id],
      // TODO: Owners
    } as CostumeDocument;
  }
}
