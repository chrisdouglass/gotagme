require('dotenv').load();  // Load env as early as possible.

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';

import * as chai from 'chai';
import * as request from 'supertest';
import * as express from 'express';
import * as ExpressFormidable from 'express-formidable';
import {sign as makeToken, verify as decodeToken} from 'jsonwebtoken';

import {DBTest} from '../../../common/test';
import {Router, Application} from 'express';
import {LoginRouterProvider, LoginAPI} from '../login_router_provider';
import {UserStore} from '../../../store/user.store';
import {AccountDocument} from '../../../model/account';
import {User, UserDocument} from '../../../model/user';
import {StringAnyMap} from '../../../common/types';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class LoginRouterTest extends DBTest {
  private _app!: Application;

  async before() {
    this._app = express();
    this._app.use(ExpressFormidable());
    const provider: LoginRouterProvider =
        new LoginRouterProvider(this.connection);
    const router: Router = provider.router();
    this._app.use('/', router);
  }

  @test  // GET /
  async testBaseRouteRedirectsToTwitterPath() {
    await request(this._app).get('/').expect(302).expect(
        'Location', '/api/twitter');
  }

  @test  // GET /token
  async testGetTokenSucceeds() {
    const userStore: UserStore = new UserStore(this.connection);
    const loginAPI: LoginAPI = new LoginAPI(userStore);
    const user: User = await this.createUser(userStore);
    const existingButExpiredToken: string = makeToken(
        {id: user.userID}, process.env.PASSPORT_JWT_SECRET, {expiresIn: -1});
    const refreshToken = 'refreshToken';

    const token: string|null = await loginAPI.createJWTIfValid(
        existingButExpiredToken, refreshToken, refreshToken);
    chai.expect(token).to.exist('No token was created.');

    const payload: StringAnyMap =
        decodeToken(token!, process.env.PASSPORT_JWT_SECRET) as StringAnyMap;
    payload.id.should.equal(user.userID);
  }

  @test  // GET /token
  async testGetTokenFails() {
    const userStore: UserStore = new UserStore(this.connection);
    const loginAPI: LoginAPI = new LoginAPI(userStore);
    chai.expect(await loginAPI.createJWTIfValid('', '', ''))
        .to.not.exist('jwt was created from invalid parameters');

    const userDoesNotExistJWT: string =
        makeToken({id: 'H3Y72aE8T'}, process.env.PASSPORT_JWT_SECRET);
    const refreshToken = 'refreshToken';
    chai.expect(await loginAPI.createJWTIfValid(
                    userDoesNotExistJWT, refreshToken, refreshToken))
        .to.not.exist('jwt was created for a non-existant user');
  }

  private async createUser(store: UserStore): Promise<User> {
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return store.create({
      accounts: [account],
    } as UserDocument);
  }
}
