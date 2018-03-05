require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {Connection} from 'mongoose';
import {TwitterUserRegistration} from '../../../src/api/twitter/twitter_user_registration';
import {TokenResponse, OAuthProvider} from '../../../src/api/twitter/twitter_oauth_provider';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class TwitterUserRegistrationTest {
  private _connection: Connection;
  private _twitter: TwitterUserRegistration;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._twitter = new TwitterUserRegistration(this._connection);
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    const fakeProvider: OAuthProvider = {
      fetchRequestTokens: () => {
        throw (new Error('Not implemented.'));
      },
      fetchAccessTokensWithVerifier: ({}, {}, {}) => {
        throw (new Error('Not implemented.'));
      },
    } as OAuthProvider;
    this._twitter = new TwitterUserRegistration(this._connection, fakeProvider);
  }

  @test.skip
  async fetchRequestTokens() {
    const token: TokenResponse = await this._twitter.fetchRequestTokens();
    chai.expect(token.token).to.exist('Token should have existed.');
    token.token!.length.should.be.greaterThan(0);
    chai.expect(token.query).to.exist('Query should have existed.');
  }

  @test.skip
  async registerToken() {
    // Begin a request then fake Twitter's response.
    const token: TokenResponse = await this._twitter.fetchRequestTokens();
    chai.expect(token.token).to.exist('Token should have existed.');
    const accessTokens: string|undefined =
        await this._twitter.registerToken(token.token!, 'crap');
    chai.expect(accessTokens)
        .to.exist('Access token response should have existed.');
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}
