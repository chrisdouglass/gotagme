require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {TwitterUserRegistration} from '../twitter_user_registration';
import {TokenResponse, OAuthProvider} from '../twitter_oauth_provider';
import {JWT, StringAnyMap} from '../../../../src/common/types';
import {decode} from 'jsonwebtoken';
import {UserStore} from '../../../../src/store/user.store';
import {User} from '../../../../src/model/user';
import {Account} from '../../../../src/model/account';
import {DBTest} from '../../../common/test';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class TwitterUserRegistrationTest extends DBTest {
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
  private _twitter!: TwitterUserRegistration;
  private _userStore!: UserStore;

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

    user.accounts!.length.should.equal(1);
    const account: Account = user.accounts![0];
    chai.expect(account).to.exist('User should have had an account.');

    account.oauthToken.should.equal(this._authTokens.token);
    account.oauthSecret.should.equal(this._authTokens.secret);
  }

  async after() {
    return this.connection.dropDatabase();
  }
}
