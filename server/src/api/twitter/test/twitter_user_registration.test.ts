require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {Connection} from 'mongoose';
import {TwitterUserRegistration} from '../twitter_user_registration';
import {TokenResponse, OAuthProvider} from '../twitter_oauth_provider';
import {JWT, StringAnyMap} from '../../../../src/common/types';
import {decode} from 'jsonwebtoken';
import {UserStore} from '../../../../src/store/user.store';
import {User} from '../../../../src/model/user';
import {Account} from '../../../../src/model/account';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class TwitterUserRegistrationTest {
  private _requestTokens: TokenResponse = {
    token: 'requestToken',
    secret: 'requestSecret',
    query: {foo: 'foo'},
  };
  private _authTokens: TokenResponse = {
    token: 'authToken',
    secret: 'authSecret',
    query: {fooAuth: 'fooAuth'},
  };
  private static _connection: Connection;
  private _twitter!: TwitterUserRegistration;
  private _userStore!: UserStore;

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.

    TwitterUserRegistrationTest._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
  }

  async before() {
    const fakeProvider: OAuthProvider = {
      fetchRequestTokens: () => {
        return Promise.resolve(this._requestTokens);
      },
      fetchAccessTokensWithVerifier: ({}, {}, {}) => {
        return Promise.resolve(this._authTokens);
      },
    } as OAuthProvider;
    this._twitter = new TwitterUserRegistration(this.connection, fakeProvider);
    this._userStore = new UserStore(this.connection);
  }

  @test
  async fetchRequestTokens() {
    const tokenResponse: TokenResponse =
        await this._twitter.fetchRequestTokens();
    chai.expect(tokenResponse).to.exist('TokenResponse should have existed.');
    tokenResponse.token.should.equal(this._requestTokens.token);
    tokenResponse.query!.should.equal(this._requestTokens.query);
  }

  @test
  async registerToken() {
    const requestTokenResponse: TokenResponse =
        await this._twitter.fetchRequestTokens();
    const requestToken: string = requestTokenResponse.token;
    chai.expect(requestToken).to.exist('Token should have existed.');

    const jwt: JWT =
        await this._twitter.registerToken(requestToken, 'javascriptsux') as JWT;
    chai.expect(jwt).to.exist('Access token response should have existed.');

    const jwtMap: StringAnyMap = decode(jwt) as StringAnyMap;
    chai.expect(jwtMap).to.exist('Access token response should have existed.');

    const user: User = await this._userStore.findOneByUserID(jwtMap.id) as User;
    chai.expect(user).to.exist('No user found for jwt.');

    user.accounts.length.should.equal(1);
    const account: Account = user.accounts[0];
    chai.expect(account).to.exist('User should have had an account.');

    account.oauthToken.should.equal(this._authTokens.token);
    account.oauthSecret.should.equal(this._authTokens.secret);
  }

  private get connection(): Connection {
    if (!TwitterUserRegistrationTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return TwitterUserRegistrationTest._connection;
  }

  async after() {
    return this.connection.dropDatabase();
  }

  static async after() {
    return TwitterUserRegistrationTest._connection.close();
  }
}
