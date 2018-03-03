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
import {Account} from '../../src/model/account/account';
import {Costume} from '../../src/model/costume/costume';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
// TODO: Expand test to test multiple users in the DB.
export class UserStoreTest {
  private _connection: mongoose.Connection;
  private _store: UserStore;
  private _userDocument: UserDocument;
  private _user: User;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new UserStore(this._connection);
    this._userDocument = {} as UserDocument;
    this._user = {} as User;
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new UserStore(this._connection);
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

  @test
  async fetchAll() {
    return this._store.fetchAll().then((users: User[]) => {
      users.length.should.equal(1);
      users[0].userID.should.equal(this._user.userID);
    });
  }

  @test.skip  // TODO: Implement.
  async update() {}

  @test
  async delete() {
    return this._store.delete(this._user)
        .then(() => {
          return this._store.findByID(this._user.userID);
        })
        .then((user: User|null) => {
          chai.expect(user).to.be.null('User was not deleted.');
        });
  }

  @test
  async findByID() {
    return this._store.findByID(this._user.userID).then((user: User|null) => {
      user!.should.exist('User was not found in the DB.');
      user!.userID.should.equal(this._user.userID);
    });
  }

  @test
  async findOneByAccountTokens() {
    return this._store
        .findOne({
          'accounts.oauthToken': this._user.accounts[0].oauthToken,
          'accounts.oauthSecret': this._user.accounts[0].oauthSecret,
        })
        .then((user: User|null) => {
          user!.should.exist('User was not found in the DB.');
        });
  }

  @test.skip  // TODO: Reenable when multiple users can be searched.
  async find() {
    return this._store.find({}).then((users: User[]) => {
      users.length.should.equal(1);
    });
  }

  @test
  async userForOAuthKeys() {
    return this._store
        .userForOAuthKeys(
            this._user.accounts[0].oauthToken,
            this._user.accounts[0].oauthSecret, false)
        .then((user: User|null) => {
          user!.should.exist('User was not found in the DB.');
        });
  }

  @test
  async createFromAccountTokens() {
    const newToken = 'newtoken';
    const newSecret = 'newsecret';
    return this._store.userForOAuthKeys(newToken, newSecret, true)
        .then((user: User|null) => {
          user!.should.exist('User was not found in the DB.');
          user!.accounts.length.should.equal(1);
          user!.accounts[0].oauthToken.should.equal(newToken);
          user!.accounts[0].oauthSecret.should.equal(newSecret);
        });
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }

  createAccountDocumentWithTestID(id: string): AccountDocument {
    return {
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
