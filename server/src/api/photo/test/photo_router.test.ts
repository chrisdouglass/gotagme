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
import {Response, Request, NextFunction} from 'express';
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
import {photosetResponseJSON} from '../../../store/test/fixtures/photosets.fixture';
import {huskysoft} from '../../../protos';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class PhotoRouterTest extends DBTest {
  private _app!: Application;
  private _loggedInUser!: User;
  private _fakeFetcher!: FlickrFetcher;

  async before() {
    this._app = express();
    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: false}));
    this._fakeFetcher = new FakeFlickrFetcher();
    const provider: PhotoRouterProvider = new PhotoRouterProvider(
        this.connection,
        (req: Request, res: Response, next: NextFunction) =>
            this.authHandler(req, res, next),
        this._fakeFetcher);
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
    emptyResponse.body.should.deep.equal({});

    const count = 5;
    const expectedBody: huskysoft.gotagme.photo.Photo[] = [];
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
      const json: huskysoft.gotagme.photo.Photo = fetched!.toProto();
      expectedBody.push(json);
    }

    const res: request.Response =
        await request(this._app).get('/').expect(200).expect(
            'Content-Type', /json/);
    const response: huskysoft.gotagme.photo.GetPhotoResponse =
        huskysoft.gotagme.photo.GetPhotoResponse.fromObject(res.body);
    response.photos.length.should.equal(count);
    for (let i = 0; i < count; i++) {
      const json: huskysoft.gotagme.photo.IPhoto = response.photos[i];
      const expected: huskysoft.gotagme.photo.IPhoto = expectedBody[i];
      json.id!.should.equal(expected.id);
      json.title!.should.equal(expected.title);
      json.description!.should.equal(expected.description);
      json.postedBy!.id!.should.equal(expected.postedBy!.id);
      json.state!.should.equal(expected.state);
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
  async postNewFlickrPhoto() {
    const urlString = 'https://www.flickr.com/photos/windows8253/40715557911/';
    const body = new huskysoft.gotagme.photo.InsertPhotosRequest(
        {requests: [this.insertPhotoRequest(urlString)]});
    const response: request.Response =
        await request(this._app)
            .post('/')
            .set('Content-Type', 'application/json')
            .send(body.toJSON())
            .expect(201)
            .expect('Content-Type', /json/);
    chai.expect(response).to.exist('No response.');
    chai.expect(response.body).to.exist('No response body.');
    const insertResponse: huskysoft.gotagme.photo.InsertPhotosResponse =
        huskysoft.gotagme.photo.InsertPhotosResponse.fromObject(response.body);
    chai.expect(insertResponse).to.exist('No insert response.');
    insertResponse.photos[0].externalUrl!.should.equal(urlString);
  }

  @test
  async postInvalidFlickrUrl() {
    const photosRequest: huskysoft.gotagme.photo.InsertPhotosRequest =
        new huskysoft.gotagme.photo.InsertPhotosRequest({
          requests: [this.insertPhotoRequest('invalid')],
        });
    await request(this._app)
        .post('/')
        .set('Content-Type', 'application/json')
        .send(photosRequest.toJSON())
        .expect(400);
  }

  @test
  async postMultiFlickrPhoto() {
    const body = new huskysoft.gotagme.photo.InsertPhotosRequest({
      requests: [
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/1/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/2/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/3/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/4/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/5/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/6/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/7/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/8/'),
        this.insertPhotoRequest('https://www.flickr.com/photos/windows8253/9/'),
        this.insertPhotoRequest(
            'https://www.flickr.com/photos/windows8253/10/'),
      ],
    });
    const response: request.Response =
        await request(this._app)
            .post('/')
            .set('Content-Type', 'application/json')
            .send(body.toJSON())
            .expect(201)
            .expect('Content-Type', /json/);
    chai.expect(response).to.exist('No response.');
    chai.expect(response.body).to.exist('No response body.');
    const insertResponse: huskysoft.gotagme.photo.InsertPhotosResponse =
        huskysoft.gotagme.photo.InsertPhotosResponse.fromObject(response.body);
    const photos: huskysoft.gotagme.photo.IPhoto[] = insertResponse.photos;
    chai.expect(photos).to.exist('No casted json response.');
    photos.length.should.equal(10);
    for (let i = 1; i <= 10; i++) {
      const photo: huskysoft.gotagme.photo.IPhoto = photos[i - 1];
      photo.id!.length.should.be.above(0);
      photo.state!.should.equal(huskysoft.gotagme.approval.ApprovalState.NEW);
      photo.title!.should.equal('Photo');
      photo.description!.should.equal(
          'Photo <a href="https://flic.kr/p/23X911u" rel="nofollow">flic.kr/p/23X911u</a>');
      photo.capturedAt!.should.equal(1520640764);
      photo.externalUrl!.should.equal(
          'https://www.flickr.com/photos/windows8253/' + i + '/');
      photo.smallImageUrl!.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_1bbe294447.jpg');
      photo.largeImageUrl!.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_1bbe294447_b.jpg');
      photo.xlargeImageUrl!.should.equal(
          'http://farm5.staticflickr.com/4791/' + i + '_b1e684eaba_o.jpg');
    }
  }

  @test
  async postPhotosRapidly() {
    // For warnings when rapidly inserting photos.
    require('events').EventEmitter.defaultMaxListeners = 100;

    for (let i = 0; i < 50; i++) {
      // This can throw.
      await this.postNewFlickrPhoto();
    }
  }

  @test
  async postFlickrAlbum() {
    const remotePath =
        'https://www.flickr.com/photos/kyotofox/33117017201/in/album-72157677604629673/';
    const body = new huskysoft.gotagme.photo.InsertPhotosRequest({
      flickrAlbumUrl: remotePath,
    });
    const photoByIDSpy = chai.spy.on(this._fakeFetcher, 'photoByID');
    const albumRequestSpy =
        chai.spy.on(this._fakeFetcher, 'albumContentsByIDAndUserID');
    const apiResponse: JSONResponse = photosetResponseJSON;
    const response: request.Response =
        await request(this._app)
            .post('/')
            .set('Content-Type', 'application/json')
            .send(body.toJSON())
            .expect(201)
            .expect('Content-Type', /json/);
    photoByIDSpy.should.have.been.called.with('33117017201');
    // The user's NSID comes from the fixture definition.
    albumRequestSpy.should.have.been.called.with(
        '72157677604629673', '148656842@N07');

    chai.expect(response).to.exist('No response.');
    const insertResponse: huskysoft.gotagme.photo.InsertPhotosResponse =
        huskysoft.gotagme.photo.InsertPhotosResponse.fromObject(response.body);
    chai.expect(insertResponse).to.exist('No insert response.');
    const apiPhotos: APIPhoto[] = apiResponse.photo as APIPhoto[];
    insertResponse.photos.length.should.equal(10);
    for (let i = 0; i < 10; i++) {
      const flickrID: string = apiPhotos[i].id!;
      // insertResponse.photos[i].externalUrl!.should.contain(flickrID);
      insertResponse.photos[i].smallImageUrl!.should.contain(flickrID);
      insertResponse.photos[i].largeImageUrl!.should.contain(flickrID);
      insertResponse.photos[i].xlargeImageUrl!.should.contain(flickrID);
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

  private insertPhotoRequest(urlString: string):
      huskysoft.gotagme.photo.InsertPhotoRequest {
    return new huskysoft.gotagme.photo.InsertPhotoRequest({
      flickrUrl: urlString,
    });
  }

  private authHandler(req: Request, {}, next: NextFunction) {
    req.user = this._loggedInUser;
    next();
  }
}

class FakeFlickrFetcher extends FlickrFetcher {
  // Ensure things crash if they haven't been overridden.
  constructor() {
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

  async albumContentsByIDAndUserID({}, {}): Promise<APIPhoto[]> {
    let photoset: APIPhoto[] = photosetResponseJSON.photo;
    photoset = JSON.parse(JSON.stringify(photoset)) as APIPhoto[];
    return photoset;
  }
}
