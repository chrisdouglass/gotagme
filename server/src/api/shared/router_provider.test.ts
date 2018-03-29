require('dotenv').load();  // Load env as early as possible.

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import * as bodyParser from 'body-parser';
import * as chai from 'chai';
import * as spies from 'chai-spies';
chai.use(spies);
import * as request from 'supertest';
import * as express from 'express';
import {generate as generateShortID} from 'shortid';
import {DBTest} from '../../common/test';
import {Application, Request, NextFunction} from 'express';
import {User, UserDocument} from '../../model/user';
import {AccountDocument} from '../../model/account';
import {UserStore} from '../../store/user.store';
import {FlickrPhoto, Photo, PhotoDocument, photoDocumentFactory, FlickrPhotoDocument} from '../../model/photo';
import {PhotoStore} from '../../store/photo.store';
import {FlickrPhotoStore} from '../../store/flickr_photo.store';
import {TagStore} from '../../store/tag.store';
import { CostumeStore } from '../../store/costume.store';
import { Costume } from '../../model/costume';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class RouterTest extends DBTest {
  private _app!: Application;
  private _loggedInUser!: User;

  private _flickrPhotoStore!: FlickrPhotoStore;
  private _photoStore!: PhotoStore;
  private _userStore!: UserStore;
  private _tagStore!: TagStore;

  /**
   * Accessors.
   */

  get app(): Application {
    return this._app;
  }

  get loggedIn(): User {
    return this._loggedInUser;
  }

  get flickrPhotoStore(): FlickrPhotoStore {
    return this._flickrPhotoStore;
  }

  get photoStore(): PhotoStore {
    return this._photoStore;
  }

  get tagStore(): TagStore {
    return this._tagStore;
  }

  get userStore(): UserStore {
    return this._userStore;
  }

  /**
   * Before setup.
   */

  async before() {
    this._flickrPhotoStore = new FlickrPhotoStore(this.connection);
    this._photoStore = new PhotoStore(this.connection);
    this._tagStore = new TagStore(this.connection);
    this._userStore = new UserStore(this.connection);
    this._loggedInUser = await this.createUser();

    this._app = express();
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: false}));
  }

  /**
   * Example test.
   */

  @test
  async testError() {
    await request(this._app).get('/').expect(404);
  }

  /**
   * Convenience functions.
   */

  async createUser(): Promise<User> {
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return this._userStore.create({
      accounts: [account],
    } as UserDocument);
  }

  /**
   * Directly inserts a photo document using Store::create.
   */
  async createPhoto(): Promise<Photo> {
    const user: User = await this.createUser();
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const document: PhotoDocument =
        photoDocumentFactory(flickrPhoto.document, user.document);
    return this._photoStore.create(document);
  }

  /**
   * Inserts a new costume added by a new user.
   */
  async createCostume(): Promise<Costume> {
    return (new CostumeStore(this.connection))
        .createWith((await this.createUser()).userID);
  }

  /**
   * Simple substitution for logging in.
   * @param req The request to mutate.
   * @param next The function to call to finish logging in.
   */
  authHandler(req: Request, {}, next: NextFunction) {
    req.user = this._loggedInUser;
    next();
  }

  /**
   * Private.
   */

  private async createFlickrPhoto(): Promise<FlickrPhoto> {
    return this._flickrPhotoStore.create({
      flickrID: generateShortID(),
      title: '',
      description: '',
    } as FlickrPhotoDocument);
  }
}
