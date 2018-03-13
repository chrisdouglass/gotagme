require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {PhotoStore} from '../photo.store';
import {PhotoDocument, Photo} from '../../model/photo';
import {FlickrPhotoDocument, FlickrPhoto} from '../../model/photo/flickr_photo';
import {UserDocument, User} from '../../model/user/user';
import {ApprovalStatus, TagKind, Tag} from '../../model/photo/photo';
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
    // Direct insertion using a document is the lowest API available.
    const photo: Photo = await this._store.create(this._photoDocument);
    photo.should.exist('Photo was not created by store from document.');
    this._photo = photo;
  }

  @test
  async tagStringAddedSuccessfully() {
    const kind: TagKind = TagKind.String;
    const value = 'string';
    const user: User = await this.user();
    const tag: Tag =
        await this._store.addTagToPhotoByKind(kind, value, this._photo, user);
    chai.expect(tag).to.not.be.null('Tag was not created.');

    // Grab the photo from the store and verify the tag was added correctly.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhoto!.tags!.length.should.equal(1);
    const actualTag: Tag = fetchedPhoto!.tags![0];
    actualTag.kind.should.equal(kind);
    actualTag.string!.should.equal(value);
    actualTag.addedBy.userID.should.equal(user.userID);
    actualTag.statuses.length.should.equal(1);
    const actualStatus: ApprovalStatus = actualTag.statuses[0];
    const actualSetByUserDoc: UserDocument = actualStatus.setBy as UserDocument;
    actualSetByUserDoc.userID.should.equal(user.userID);
    actualStatus.state.should.equal(ApprovalState.New);
  }

  @test
  async multipleTagsAddedSuccessfully() {
    const user: User = await this.user();
    await this._store.addTagToPhotoByKind(
        TagKind.String, 'string1', this._photo, user);
    await this._store.addTagToPhotoByKind(
        TagKind.String, 'string2', this._photo, user);
    await this._store.addTagToPhotoByKind(
        TagKind.String, 'string3', this._photo, user);
    const fetchedPhotoMultiTags: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhotoMultiTags!.tags!.length.should.equal(3);
  }

  @test
  async tagsRemovedSuccessfully() {
    const user: User = await this.user();
    const tag: Tag = await this._store.addTagToPhotoByKind(
        TagKind.String, 'string1', this._photo, user);
    // Grab a fresh photo from the store.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhoto!.tags!.length.should.equal(1);
    await this._store.removeTagFromPhoto(tag, fetchedPhoto!);
    const expectNoTagPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    expectNoTagPhoto!.tags!.length.should.equal(0);
  }

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
    return this._connection.dropDatabase();
  }
}
