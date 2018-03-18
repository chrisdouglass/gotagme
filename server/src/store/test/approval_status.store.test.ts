require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {User, UserDocument} from '../../model/user';
import {UserStore} from '../user.store';
import {DBTest} from '../../common/test';
import {ApprovalStore} from '../approval.store';
import {AccountDocument} from '../../model/account';
import {generate as generateShortID} from 'shortid';
import {Photo, FlickrPhotoDocument, PhotoDocument, FlickrPhoto, photoDocumentFactory} from '../../model/photo';
import {FlickrPhotoStore} from '../flickr_photo.store';
import {PhotoStore} from '../photo.store';
import {TagStore} from '../tag.store';
import {Tag} from '../../model/tag';
import {ApprovalState} from '../../common/types';
import {ApprovalStatus} from '../../model/approval';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class ApprovalStoreTest extends DBTest {
  private _store!: ApprovalStore;

  async before() {
    this._store = new ApprovalStore(this.connection);
  }

  @test.skip
  async noRepeatedStatusInserts() {
    // const user: User = await this.createUser();
    // const costume: Costume = await this.createCostume();
    // const photo: Photo = await this.createPhoto();
    // const costumeTag: Tag =
    //     await this._store.addTagValueToPhoto(costume, photo, user);
    // // Try to approve and reject twice.
    // await this._store.setTagApprovalState(
    //     costumeTag, ApprovalState.Approved, user);
    // await this._store.setTagApprovalState(
    //     costumeTag, ApprovalState.Approved, user);
    // costumeTag.statuses.length.should.equal(2);  // New + 1 approval
    // (await this._store.findOneByTagID(costumeTag.tagID))!.currentStatus.state
    //     .should.equal(ApprovalState.Approved);
    // await this._store.setTagApprovalState(
    //     costumeTag, ApprovalState.Rejected, user);
    // await this._store.setTagApprovalState(
    //     costumeTag, ApprovalState.Rejected, user);
    // costumeTag.statuses.length.should.equal(
    //     3);  // New + 1 approval + 1 rejected
    // (await this._store.findOneByTagID(costumeTag.tagID))!.currentStatus.state
    //     .should.equal(ApprovalState.Rejected);
  }

  @test
  async tagSetApprovalStatus() {
    const tagStore: TagStore = new TagStore(this.connection);
    const user1: User = await this.createUser();
    const user2: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const value = 'string1';
    await tagStore.addStringTagToPhoto(value, photo, user1);
    // Grab a fresh tag from the store.
    const tags: Tag[] = await tagStore.findByValue(value);
    tags.length.should.equal(1);
    const fetchedTag: Tag = tags[0];
    fetchedTag.currentState.should.equal(ApprovalState.New);

    const newStatusOnly: ApprovalStatus[] =
        await this._store.statusesForTag(fetchedTag);
    newStatusOnly.length.should.equal(1);
    newStatusOnly[0].state.should.equal(ApprovalState.New);
    newStatusOnly[0].setBy.userID.should.equal(user1.userID);

    // Approve and then reject the tag.
    chai.expect(await this._store.setTagApprovalStateByID(
                    fetchedTag.tagID, ApprovalState.Approved, user1))
        .to.exist('Approval status not returned.');
    chai.expect(await this._store.setTagApprovalStateByID(
                    fetchedTag.tagID, ApprovalState.Rejected, user2))
        .to.exist('Approval status not returned.');

    const postUpdateTags: Tag[] = await tagStore.findByValue(value);
    postUpdateTags.length.should.equal(1);
    postUpdateTags[0].currentState.should.equal(ApprovalState.Rejected);

    const threeStatuses: ApprovalStatus[] =
        await this._store.statusesForTag(fetchedTag);
    threeStatuses.length.should.equal(3);
    threeStatuses[0].state.should.equal(ApprovalState.New);
    threeStatuses[0].setBy.userID.should.equal(user1.userID);
    threeStatuses[1].state.should.equal(ApprovalState.Approved);
    threeStatuses[1].setBy.userID.should.equal(user1.userID);
    // User 2 rejected.
    threeStatuses[2].state.should.equal(ApprovalState.Rejected);
    threeStatuses[2].setBy.userID.should.equal(user2.userID);
  }

  @test.skip
  async photoSetApprovalStatus() {
    // const user: User = await this.createUser();
    // const photo: Photo = await this.createPhoto();
    // photo.statuses.length.should.equal(1);
    // photo.setApprovalState(ApprovalState.Approved, user);
    // photo.statuses.length.should.equal(2);
    // await this._store.update(photo);

    // const refetched: Photo|null =
    //     await this._store.findByPhotoID(photo.photoID);
    // await this._store.populate(refetched!);
    // refetched!.statuses.length.should.equal(2);

    // refetched!.currentStatus.state.should.equal(ApprovalState.Approved);
    // (refetched!.currentStatus.setBy as UserDocument)
    //     .userID.should.equal(user.userID);

    // let error: Error|undefined;
    // try {
    //   photo.setApprovalState(ApprovalState.New, await this.createUser());
    // } catch (err) {
    //   error = err;
    // }
    // chai.expect(error).to.exist(
    //     'No error was thrown trying to set New approval state.');
  }

  @test.skip
  async photosByCurrentApprovalStatus() {
    // const user: User = await this.createUser();
    // const photo1: Photo = await this.createPhoto();
    // photo1.setApprovalState(ApprovalState.Rejected, user);
    // photo1.setApprovalState(ApprovalState.Approved, await this.createUser());
    // await this._store.update(photo1);
    // const photo2: Photo = await this.createPhoto();
    // photo2.setApprovalState(ApprovalState.Approved, user);
    // await this._store.update(photo2);
    // const photo3: Photo = await this.createPhoto();
    // photo3.setApprovalState(ApprovalState.Rejected, user);
    // await this._store.update(photo3);
    // await this.createPhoto();
    // await this.createPhoto();

    // (await this._store.findByApproval(ApprovalState.New))
    //     .length.should.equal(2);
    // (await this._store.findByApproval(ApprovalState.Approved))
    //     .length.should.equal(2);
    // (await this._store.findByApproval(ApprovalState.Rejected))
    //     .length.should.equal(1);
  }

  // Directly inserts a photo document using Store::create.
  private async createPhoto(): Promise<Photo> {
    const user: User = await this.createUser();
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const document: PhotoDocument =
        photoDocumentFactory(flickrPhoto.document, user.document);
    return (new PhotoStore(this.connection)).create(document);
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
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return (new UserStore(this.connection)).create({
      accounts: [account],
    } as UserDocument);
  }
}
