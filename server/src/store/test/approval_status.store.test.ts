require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {User} from '../../model/user';
import {DBTest} from '../../common/test';
import {ApprovalStore} from '../approval.store';
import {Photo} from '../../model/photo';
import {PhotoStore} from '../photo.store';
import {TagStore} from '../tag.store';
import {Tag} from '../../model/tag';
import {ApprovalStatus, ApprovalState} from '../../model/approval';
import {Costume} from '../../model/costume';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class ApprovalStoreTest extends DBTest {
  private _store!: ApprovalStore;

  async before() {
    await super.before();
    this._store = new ApprovalStore(this.connection);
  }

  @test
  async noRepeatedStatusInserts() {
    const tagStore: TagStore = new TagStore(this.connection);
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const photo: Photo = await this.createPhoto();
    const costumeTag: Tag =
        await tagStore.addTagValueToPhoto(costume, photo, user);

    // Try to approve and reject twice.
    await this._store.setTagApprovalState(
        costumeTag, ApprovalState.Approved, user);
    await this._store.setTagApprovalState(
        costumeTag, ApprovalState.Approved, user);
    (await tagStore.findOneByTagID(
        costumeTag.tagID))!.currentState.should.equal(ApprovalState.Approved);

    const twoStatuses: ApprovalStatus[] =
        await this._store.fetchByTag(costumeTag);
    twoStatuses.length.should.equal(2);  // New + 1 approval
    twoStatuses[0].state.should.equal(ApprovalState.New);
    twoStatuses[0].setBy.userID.should.equal(user.userID);
    twoStatuses[1].state.should.equal(ApprovalState.Approved);
    twoStatuses[1].setBy.userID.should.equal(user.userID);

    await this._store.setTagApprovalState(
        costumeTag, ApprovalState.Rejected, user);
    await this._store.setTagApprovalState(
        costumeTag, ApprovalState.Rejected, user);
    (await tagStore.findOneByTagID(
        costumeTag.tagID))!.currentState.should.equal(ApprovalState.Rejected);

    const threeStatuses: ApprovalStatus[] =
        await this._store.fetchByTag(costumeTag);
    threeStatuses.length.should.equal(3);  // New + 1 approval + 1 rejected
    threeStatuses[0].state.should.equal(ApprovalState.New);
    threeStatuses[1].state.should.equal(ApprovalState.Approved);
    threeStatuses[2].state.should.equal(ApprovalState.Rejected);
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
        await this._store.fetchByTag(fetchedTag);
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
        await this._store.fetchByTag(fetchedTag);
    threeStatuses.length.should.equal(3);
    threeStatuses[0].state.should.equal(ApprovalState.New);
    threeStatuses[0].setBy.userID.should.equal(user1.userID);
    threeStatuses[1].state.should.equal(ApprovalState.Approved);
    threeStatuses[1].setBy.userID.should.equal(user1.userID);
    // User 2 rejected.
    threeStatuses[2].state.should.equal(ApprovalState.Rejected);
    threeStatuses[2].setBy.userID.should.equal(user2.userID);
  }

  @test
  async photoSetApprovalState() {
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const postedBy: User = photo.postedBy;
    photo.currentState.should.equal(ApprovalState.New);

    await this._store.setPhotoApprovalState(
        photo, ApprovalState.Approved, user);

    const fetched: Photo|null =
        await (new PhotoStore(this.connection)).findByPhotoID(photo.photoID);
    fetched!.currentState.should.equal(ApprovalState.Approved);

    const approvedStatus: ApprovalStatus =
        await this._store.currentStatusForPhoto(fetched!);
    approvedStatus.state.should.equal(ApprovalState.Approved);
    approvedStatus.setBy.userID.should.equal(user.userID);

    const twoStatuses: ApprovalStatus[] =
        await this._store.fetchByPhoto(fetched!);
    twoStatuses.length.should.equal(2);  // New + 1 approval
    twoStatuses[0].state.should.equal(ApprovalState.New);
    twoStatuses[0].setBy.userID.should.equal(postedBy.userID);
    twoStatuses[1].state.should.equal(ApprovalState.Approved);
    twoStatuses[1].setBy.userID.should.equal(user.userID);

    await this._store.setPhotoApprovalState(
        photo, ApprovalState.Rejected, user);

    const rejectedStatus: ApprovalStatus =
        await this._store.currentStatusForPhoto(fetched!);
    rejectedStatus.state.should.equal(ApprovalState.Rejected);
    rejectedStatus.setBy.userID.should.equal(user.userID);

    const threeStatuses: ApprovalStatus[] =
        await this._store.fetchByPhoto(fetched!);
    threeStatuses.length.should.equal(3);
    threeStatuses[0].state.should.equal(ApprovalState.New);
    threeStatuses[0].setBy.userID.should.equal(postedBy.userID);
    threeStatuses[1].state.should.equal(ApprovalState.Approved);
    threeStatuses[1].setBy.userID.should.equal(user.userID);
    threeStatuses[2].state.should.equal(ApprovalState.Rejected);
    threeStatuses[2].setBy.userID.should.equal(user.userID);

    // TODO: Verify a photo cannot be set back to New.
  }
}
