require('dotenv').load();  // Load env as early as possible.

// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';

import * as chai from 'chai';
import * as request from 'supertest';
import * as express from 'express';
import {Response, Request, NextFunction} from 'express';
import * as ExpressFormidable from 'express-formidable';
import * as Flickr from 'flickr-sdk';
import {Photo as APIPhoto} from 'flickr-sdk';

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
import {StringAnyMap, JSONResponse} from '../../../common/types';
import {ApprovalStore} from '../../../store/approval.store';
import {ApprovalState} from '../../../model/approval';
import {CostumeStore} from '../../../store/costume.store';
import {Costume} from '../../../model/costume';
import {TagStore} from '../../../store/tag.store';
import {FlickrFetcher} from '../../../flickr/flickr_fetcher';
import {apiPhoto1JSON} from '../../../store/test/fixtures/api_photos.fixture';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class PhotoRouterTest extends DBTest {
  private _app!: Application;
  private _loggedInUser!: User;

  async before() {
    this._app = express();
    this._app.use(ExpressFormidable());
    const provider: PhotoRouterProvider = new PhotoRouterProvider(
        this.connection,
        (req: Request, res: Response, next: NextFunction) =>
            this.authHandler(req, res, next),
        new FakeFlickrFetcher({}));
    const router: Router = provider.router();
    this._app.use('/', router);
    this._loggedInUser = await this.createUser();
  }

  @test
  async getAllPhotos() {
    const approvalStore: ApprovalStore = new ApprovalStore(this.connection);
    const store: PhotoStore = new PhotoStore(this.connection);

    const emptyResponse: request.Response =
        await request(this._app).get('/').expect(200).expect(
            'Content-Type', /json/);
    emptyResponse.body.should.deep.equal([]);

    const count = 5;
    const expectedBody: StringAnyMap[] = [];
    const user: User = await this.createUser();
    for (let i = 0; i < count; i++) {
      const photo: Photo = await this.createPhotoInStore(store);

      // Change the status of some of the photos.
      if (i % 2) {
        await approvalStore.setPhotoApprovalState(
            photo, ApprovalState.Approved, user);
      }
      if (i % 3) {
        await approvalStore.setPhotoApprovalState(
            photo, ApprovalState.Rejected, user);
      }

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

  @test.skip
  async searchPhotos() {
    const approvalStore: ApprovalStore = new ApprovalStore(this.connection);
    const photoStore: PhotoStore = new PhotoStore(this.connection);
    const tagStore: TagStore = new TagStore(this.connection);

    const user: User = await this.createUser();
    const costume: Costume = await (
        new CostumeStore(this.connection).createWith(user.userID, 'Gorilla'));

    const count = 5;
    const expectedBody: StringAnyMap[] = [];
    for (let i = 0; i < count; i++) {
      const photo: Photo = await this.createPhotoInStore(photoStore);

      // Change the status of some of the photos.
      if (i % 2) {
        await approvalStore.setPhotoApprovalState(
            photo, ApprovalState.Approved, user);
      }
      if (i % 3) {
        await approvalStore.setPhotoApprovalState(
            photo, ApprovalState.Rejected, user);
      }

      // Add tags to photos.
      const costumeTagJSON: {} =
          (await tagStore.addCostumeTagToPhoto(costume, photo, user)).toJSON();
      const userTagJSON: {} =
          (await tagStore.addUserTagToPhoto(user, photo, user)).toJSON();
      const stringTagJSON: {} =
          (await tagStore.addStringTagToPhoto('big', photo, user)).toJSON();

      const fetched: Photo|null =
          await photoStore.findByObjectID(photo.objectID);
      const json: StringAnyMap = fetched!.toJSON();
      json.tags = [costumeTagJSON, userTagJSON, stringTagJSON];
      expectedBody.push(json);
    }

    // TODO: Perform search test.
  }

  @test
  async postNewPhoto() {
    const response: request.Response =
        await request(this._app)
            .post('/')
            .set('Content-Type', 'application/json')
            .send({
              flickrUrls:
                  ['https://www.flickr.com/photos/windows8253/40715557911/']
            })
            .expect(201)
            .expect('Content-Type', /json/);
    chai.expect(response).to.exist('No response.');
    chai.expect(response.body).to.exist('No response body.');
    const json: JSONResponse = response.body as JSONResponse;
    chai.expect(json).to.exist('No casted json response.');
  }

  @test
  async postInvalidUrl() {
    // const response: request.Response =
    await request(this._app)
        .post('/')
        .set('Content-Type', 'application/json')
        .send({flickrUrls: ['foo']})
        .expect(400);
  }

  @test
  async postMultiPhoto() {
    const response: request.Response =
        await request(this._app)
            .post('/')
            .set('Content-Type', 'application/json')
            .send({
              flickrUrls: [
                'https://www.flickr.com/photos/windows8253/1/',
                'https://www.flickr.com/photos/windows8253/2/',
                'https://www.flickr.com/photos/windows8253/3/',
                'https://www.flickr.com/photos/windows8253/4/',
                'https://www.flickr.com/photos/windows8253/5/',
                'https://www.flickr.com/photos/windows8253/6/',
                'https://www.flickr.com/photos/windows8253/7/',
                'https://www.flickr.com/photos/windows8253/8/',
                'https://www.flickr.com/photos/windows8253/9/',
                'https://www.flickr.com/photos/windows8253/10/',
              ]
            })
            .expect(201)
            .expect('Content-Type', /json/);
    chai.expect(response).to.exist('No response.');
    chai.expect(response.body).to.exist('No response body.');
    const json: JSONResponse = response.body as JSONResponse;
    chai.expect(json).to.exist('No casted json response.');
    json.length.should.equal(10);
    for (let i = 1; i <= 10; i++) {
      const response: JSONResponse = json[i - 1];
      response.photoID.length.should.be.above(0);
      response.state.should.equal(ApprovalState.New);
      response.posted.should.be.above(0);
      response.modified.should.be.above(0);
      response.title.should.equal('Photo');
      response.description.should.equal(
          'Photo <a href="https://flic.kr/p/23X911u" rel="nofollow">flic.kr/p/23X911u</a>');
      response.capturedAt.should.equal('2018-03-10T00:12:44.000Z');
      response.flickrUrl.should.equal(
          'https://www.flickr.com/photos/windows8253/' + i + '/');
      response.smallImageUrl.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_1bbe294447.jpg');
      response.largeImageUrl.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_1bbe294447_b.jpg');
      response.xlargeImageUrl.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_1bbe294447_h.jpg');
      response.originalImageUrl.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_b1e684eaba_o.jpg');
    }
  }

  @test
  async postPhotosRapidly() {
    // For warnings when rapidly inserting photos.
    require('events').EventEmitter.defaultMaxListeners = 100;

    for (let i = 0; i < 50; i++) {
      // This can throw.
      await this.postNewPhoto();
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

  private authHandler(req: Request, {}, next: NextFunction) {
    req.user = this._loggedInUser;
    next();
  }
}

class FakeFlickrFetcher extends FlickrFetcher {
  // Ensure things crash if they haven't been overridden.
  constructor({}) {
    super({} as Flickr);
  }

  async photoByID(photoID: string): Promise<APIPhoto> {
    let photo: APIPhoto = (apiPhoto1JSON as APIPhoto);
    photo = JSON.parse(JSON.stringify(photo)) as APIPhoto;
    photo.id = photoID;
    photo.urls.url[0]._content =
        'https://www.flickr.com/photos/windows8253/' + photoID + '/';
    return photo;
  }
}
