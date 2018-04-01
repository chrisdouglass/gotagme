require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {PhotoStore} from '../photo.store';
import {Photo} from '../../model/photo';
import {FlickrPhoto} from '../../model/photo/flickr_photo';
import {User} from '../../model/user';
import {DBTest} from '../../common/test';
import {ApprovalStore} from '../approval.store';
import {ApprovalState} from '../../model/approval';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class PhotoStoreTest extends DBTest {
  private _store!: PhotoStore;

  async before() {
    await super.before();
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
  async photosByCurrentApprovalStatus() {
    const approvalStore: ApprovalStore = new ApprovalStore(this.connection);
    const user: User = await this.createUser();
    const photo1: Photo = await this.createPhoto();
    await approvalStore.setPhotoApprovalState(
        photo1, ApprovalState.Rejected, user);
    await approvalStore.setPhotoApprovalState(
        photo1, ApprovalState.Approved, await this.createUser());

    const photo2: Photo = await this.createPhoto();
    await approvalStore.setPhotoApprovalState(
        photo2, ApprovalState.Approved, user);

    const photo3: Photo = await this.createPhoto();
    await approvalStore.setPhotoApprovalState(
        photo3, ApprovalState.Rejected, user);

    await this.createPhoto();
    await this.createPhoto();

    (await this._store.findByApproval(ApprovalState.New))
        .length.should.equal(2);
    (await this._store.findByApproval(ApprovalState.Approved))
        .length.should.equal(2);
    (await this._store.findByApproval(ApprovalState.Rejected))
        .length.should.equal(1);
  }

  async after() {
    return this.connection.dropDatabase();
  }
}
