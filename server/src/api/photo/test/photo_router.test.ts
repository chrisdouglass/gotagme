require('dotenv').load();  // Load env as early as possible.

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';

import * as request from 'supertest';
import * as express from 'express';

import {DBTest} from '../../../common/test';
import {generate as generateShortID} from 'shortid';
import {Router, Application} from 'express';
import {PhotoRouterProvider} from '../photo_router_provider';
import {Photo, FlickrPhoto, PhotoDocument, FlickrPhotoDocument} from '../../../model/photo';
import {PhotoStore} from '../../../store/photo.store';
import {User, UserDocument} from '../../../model/user';
import {photoDocumentFactory} from '../../../model/photo/photo';
import {FlickrPhotoStore} from '../../../store/flickr_photo.store';
import {UserStore} from '../../../store/user.store';
import {AccountDocument} from '../../../model/account';
import {StringAnyMap} from '../../../common/types';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class PhotoRouterTest extends DBTest {
  private _app!: Application;
  async before() {
    this._app = express();
    const provider: PhotoRouterProvider =
        new PhotoRouterProvider(this.connection);
    const router: Router = provider.router();
    this._app.use('/', router);
  }

  @test
  async getAllPhotos() {
    const emptyResponse: request.Response =
        await request(this._app).get('/').expect(200).expect(
            'Content-Type', /json/);
    emptyResponse.body.should.deep.equal([]);

    const store: PhotoStore = new PhotoStore(this.connection);
    const count = 5;
    const expectedBody: StringAnyMap[] = [];
    for (let i = 0; i < count; i++) {
      const photo: Photo = await this.createPhotoInStore(store);
      const fetched: Photo|null = await store.findByObjectID(photo.objectID);
      const json: StringAnyMap = fetched!.toJSON();
      expectedBody.push(json);
    }
    const response: request.Response =
        await request(this._app).get('/').expect(200).expect(
            'Content-Type', /json/);
    response.body.length.should.equal(count);
    for (let i = 0; i < count; i++) {
      const json: StringAnyMap = response.body[i];
      const expected: StringAnyMap = expectedBody[i];
      json.photoID.should.equal(expected.photoID);
      json.title.should.equal(expected.title);
      json.description.should.equal(expected.description);
      json.postedBy.should.equal(expected.postedBy);
      json.state.should.equal(expected.state);
    }
  }

  // Directly inserts a photo document using Store::create.
  private async createPhotoInStore(store: PhotoStore): Promise<Photo> {
    const user: User = await this.createUser();
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const document: PhotoDocument =
        photoDocumentFactory(flickrPhoto.document, user.document);
    return store.create(document);
  }

  private async createFlickrPhoto(): Promise<FlickrPhoto> {
    const store: FlickrPhotoStore = new FlickrPhotoStore(this.connection);
    return store.create({
      flickrID: generateShortID(),
      title: '',
      description: '',
    } as FlickrPhotoDocument);
  }

  private async createUser(): Promise<User> {
    const store: UserStore = new UserStore(this.connection);
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return store.create({
      accounts: [account],
    } as UserDocument);
  }
}
