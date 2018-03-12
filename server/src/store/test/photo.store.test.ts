require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {PhotoStore} from '../photo.store';
import {PhotoDocument, Photo} from '../../model/photo';
import {FlickrPhotoDocument, FlickrPhoto} from '../../model/photo/flickr_photo';
import {UserDocument, User} from '../../model/user/user';
import {ApprovalStatus} from '../../model/photo/photo';
import {ApprovalState} from '../../common/types';
import {UserStore} from '../user.store';
import {FlickrPhotoStore} from '../flickr_photo.store';
import {AccountDocument} from '../../model/account/account';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class PhotoStoreTest {
  private _connection: mongoose.Connection;
  private _store: PhotoStore;
  private _photoDocument: PhotoDocument;
  private _photo: Photo;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new PhotoStore(this._connection);
    this._photoDocument = {} as PhotoDocument;
    this._photo = {} as Photo;
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new PhotoStore(this._connection);
    const user: User = await this.user();
    const date: Date = new Date();
    const flickrPhoto: FlickrPhoto = await this.flickrPhoto();
    const document: PhotoDocument = {
      flickrPhoto: flickrPhoto.document,
      dateAdded: date,
      postedBy: user.document._id,
      statuses: [{
        state: ApprovalState.New,
        setBy: user.document._id,
        dateAdded: date,
      } as ApprovalStatus]
    } as PhotoDocument;
    this._photoDocument = document;
    const photo: Photo = await this._store.create(this._photoDocument);
    photo.should.exist('Photo was not created by store from document.');
    this._photo = photo;
  }

  @test
  async test() {
    this._photo.should.exist('Photo should have existed.');
  }

  @test.skip
  async tagsAddedSuccessfully() {}

  @test.skip
  async tagsRemovedSuccessfully() {}

  @test.skip
  async tagSetApprovalStatus() {}

  @test.skip
  async invalidTagsRejected() {}

  @test.skip
  async photoFetchedFromTags() {}

  @test.skip
  async photoFromFlickrPhotoAndUser() {}

  @test.skip
  async photoFromFlickrAPIPhotoAndUser() {}

  @test.skip
  async photosPostedByUser() {}

  @test.skip
  async photosCapturedByUser() {}

  @test.skip
  async photosByApproval() {}

  @test.skip
  async photosSetApprovalStatus() {}

  async flickrPhoto(): Promise<FlickrPhoto> {
    const store: FlickrPhotoStore = new FlickrPhotoStore(this._connection);
    return store.create({
      flickrID: 'flickrID',
      title: '',
      description: '',
    } as FlickrPhotoDocument);
  }

  async user(): Promise<User> {
    const store: UserStore = new UserStore(this._connection);
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return store.create({
      userID: 'userID',
      accounts: [account],
    } as UserDocument);
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}
