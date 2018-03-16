require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
// import {Connection} from 'mongoose';
import {suite, test} from 'mocha-typescript';
import {PhotoStore} from '../photo.store';
import {PhotoDocument, Photo} from '../../model/photo';
import {FlickrPhotoDocument, FlickrPhoto} from '../../model/photo/flickr_photo';
import {UserDocument, User} from '../../model/user';
import {UserStore} from '../user.store';
import {FlickrPhotoStore} from '../flickr_photo.store';
import {AccountDocument} from '../../model/account';
import {generate as generateShortID} from 'shortid';
import {ApprovalState} from '../../model/base/approval';
import {photoDocumentFactory} from '../../model/photo/photo';
import { DBTest } from '../../common/test';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class PhotoStoreTest extends DBTest {
  private _store!: PhotoStore;

  async before() {
    this._store = new PhotoStore(this.connection);
  }

  @test
  async photoFromFlickrPhotoAndUser() {
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const user: User = await this.createUser();
    const photo: Photo =
        await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto, user);
    chai.expect(photo).to.exist('Photo was not created.');
    photo.serverID!.should.equal(flickrPhoto.flickrID);
    photo.postedBy.equalsUser(user).should.be.true('Posted by did not match');

    const expectedIdenticalPhoto: Photo =
        await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto, user);
    expectedIdenticalPhoto.photoID.should.equal(photo.photoID);

    const expectedDifferentPhoto: Photo =
        await this._store.createFromFlickrPhotoPostedByUser(
            await this.createFlickrPhoto(), user);
    expectedDifferentPhoto.photoID.should.not.equal(photo.photoID);
  }

  @test
  async photosPostedByUser() {
    const flickrPhoto1User1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto2User1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto3User1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto1User2: FlickrPhoto = await this.createFlickrPhoto();
    const user1: User = await this.createUser();
    const user2: User = await this.createUser();
    await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto1User1, user1);
    await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto2User1, user1);
    await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto3User1, user1);
    await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto1User2, user2);
    (await this._store.findPostedBy(user1)).length.should.equal(3);
    (await this._store.findPostedBy(user2)).length.should.equal(1);
  }

  @test
  async photosCapturedByUser() {
    const flickrPhoto1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto2: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto3: FlickrPhoto = await this.createFlickrPhoto();
    const postedByUser: User = await this.createUser();
    const capturedByUser: User = await this.createUser();
    const photo1: Photo = await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto1, postedByUser);
    photo1.document.capturedBy = capturedByUser.document;
    await this._store.update(photo1);
    const photo2: Photo = await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto2, postedByUser);
    photo2.document.capturedBy = capturedByUser.document;
    await this._store.update(photo2);
    await this._store.createFromFlickrPhotoPostedByUser(
        flickrPhoto3, postedByUser);
    (await this._store.fetchAll()).length.should.equal(3);
    (await this._store.findCapturedBy(capturedByUser)).length.should.equal(2);
  }

  @test
  async photoSetApprovalStatus() {
    const photo: Photo = await this.createPhoto();
    photo.statuses.length.should.equal(1);
    const user: User = await this.createUser();
    photo.setApprovalState(ApprovalState.Approved, user);
    photo.statuses.length.should.equal(2);
    await this._store.update(photo);

    const refetched: Photo|null =
        await this._store.findByPhotoID(photo.photoID);
    refetched!.statuses.length.should.equal(2);

    refetched!.currentStatus.state.should.equal(ApprovalState.Approved);
    (refetched!.currentStatus.setBy as UserDocument)
        .userID.should.equal(user.userID);

    let error: Error|undefined;
    try {
      photo.setApprovalState(ApprovalState.New, await this.createUser());
    } catch (err) {
      error = err;
    }
    chai.expect(error).to.exist(
        'No error was thrown trying to set New approval state.');
  }

  @test
  async photosByCurrentApprovalStatus() {
    const user: User = await this.createUser();
    const photo1: Photo = await this.createPhoto();
    photo1.setApprovalState(ApprovalState.Rejected, user);
    photo1.setApprovalState(ApprovalState.Approved, await this.createUser());
    await this._store.update(photo1);
    const photo2: Photo = await this.createPhoto();
    photo2.setApprovalState(ApprovalState.Approved, user);
    await this._store.update(photo2);
    const photo3: Photo = await this.createPhoto();
    photo3.setApprovalState(ApprovalState.Rejected, user);
    await this._store.update(photo3);
    await this.createPhoto();
    await this.createPhoto();

    (await this._store.findByApproval(ApprovalState.New))
        .length.should.equal(2);
    (await this._store.findByApproval(ApprovalState.Approved))
        .length.should.equal(2);
    (await this._store.findByApproval(ApprovalState.Rejected))
        .length.should.equal(1);
  }

  // Directly inserts a photo document using Store::create.
  private async createPhoto(): Promise<Photo> {
    const store: PhotoStore = new PhotoStore(this.connection);
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

  async after() {
    return this.connection.dropDatabase();
  }
}
