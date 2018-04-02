require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {TagStore} from '../tag.store';
import {Costume} from '../../model/costume';
import {User} from '../../model/user';
import {Photo} from '../../model/photo';
import {ApprovalState} from '../../model/approval';
import {PhotoStore} from '../photo.store';
import {Tag, TagKind} from '../../model/tag';
import {DBTest} from '../../common/test';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class TagStoreTest extends DBTest {
  private _store!: TagStore;
  private _photoStore!: PhotoStore;

  async before() {
    await super.before();
    this._store = new TagStore(this.connection);
    this._photoStore = new PhotoStore(this.connection);
  }

  @test
  async tagStringAddedSuccessfully() {
    const value = 'string';
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const tag: Tag = await this._store.addStringTagToPhoto(value, photo, user);
    chai.expect(tag).to.not.be.null('Tag was not created.');

    // Grab the photo from the store and verify the tag was added correctly.
    const fetchedPhoto: Photo|null =
        await (this._photoStore.findByPhotoID(photo.photoID));
    const tags: Tag[] = await this._store.findByPhoto(fetchedPhoto!);
    tags.length.should.equal(1);
    const actualTag: Tag = tags[0];
    actualTag.kind.should.equal(TagKind.String);
    actualTag.equalsValue(value).should.be.true('Tag values did not match.');
    actualTag.addedBy.userID.should.equal(user.userID);
    actualTag.currentState.should.equal(ApprovalState.New);
  }

  @test
  /** Tests adding string, costume, and user tags together. */
  async multipleTagsAddedSuccessfully() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const photo: Photo = await this.createPhoto();
    await this._store.addStringTagToPhoto('string1', photo, user);
    await this._store.addCostumeTagToPhoto(costume, photo, user);
    await this._store.addUserTagToPhoto(user, photo, user);
    const fetchedPhotoMultiTags: Photo|null =
        await (new PhotoStore(this.connection)).findByPhotoID(photo.photoID);
    (await this._store.findByPhoto(fetchedPhotoMultiTags!))
        .length.should.equal(3);
  }

  @test
  async duplicateTagsReturnOriginals() {
    const photo: Photo = await this.createPhoto();
    const user: User = await this.createUser();
    const tag1: Tag =
        await this._store.addStringTagToPhoto('string', photo, user);
    const tag2: Tag =
        await this._store.addStringTagToPhoto('string', photo, user);
    (await this._store.fetchAll()).length.should.equal(1);
    tag1.tagID.should.equal(tag2.tagID);
    const costume: Costume = await this.createCostume();
    const tag3: Tag =
        await this._store.addCostumeTagToPhoto(costume, photo, user);
    const tag4: Tag =
        await this._store.addCostumeTagToPhoto(costume, photo, user);
    (await this._store.fetchAll()).length.should.equal(2);
    tag3.tagID.should.equal(tag4.tagID);
    const otherUser: User = await this.createUser();
    const tag5: Tag =
        await this._store.addUserTagToPhoto(otherUser, photo, user);
    const tag6: Tag =
        await this._store.addUserTagToPhoto(otherUser, photo, user);
    (await this._store.fetchAll()).length.should.equal(3);
    tag5.tagID.should.equal(tag6.tagID);
  }

  @test
  async tagsRemovedSuccessfully() {
    // Test remove specific tag.
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const value = 'string1';
    await this._store.addStringTagToPhoto(value, photo, user);
    (await this._store.fetchAll()).length.should.equal(1);
    await this._store.removeTagFromPhotoByValue(value, photo);
    (await this._store.fetchAll()).length.should.equal(0);

    const photo2: Photo = await this.createPhoto();
    const value2: Costume = await this.createCostume();
    await this._store.addCostumeTagToPhoto(value2, photo2, user);
    (await this._store.findByPhoto(photo2)).length.should.equal(1);
    await this._store.removeTagFromPhotoByValue(value2, photo2);
    (await this._store.findByPhoto(photo2)).length.should.equal(0);
  }

  @test
  async photosByTagValue() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const anotherUser: User = await this.createUser();
    const photo: Photo = await this.createPhoto();

    // Add multiple tags to instance photo.
    await this._store.addCostumeTagToPhoto(costume, photo, user);
    await this._store.addUserTagToPhoto(anotherUser, photo, user);
    await this._store.addStringTagToPhoto('tag1', photo, user);

    await this._store.addStringTagToPhoto(
        'tag1', await this.createPhoto(), user);
    await this._store.addStringTagToPhoto(
        'tag1', await this.createPhoto(), user);
    await this._store.addCostumeTagToPhoto(
        costume, await this.createPhoto(), user);
    await this._store.addUserTagToPhoto(
        anotherUser, await this.createPhoto(), anotherUser);
    await this._store.addUserTagToPhoto(
        anotherUser, await this.createPhoto(), anotherUser);
    await this._store.addUserTagToPhoto(
        anotherUser, await this.createPhoto(), anotherUser);

    (await this._store.findByValue('tag1')).length.should.equal(3);
    (await this._store.findByValue(costume)).length.should.equal(2);
    (await this._store.findByValue(anotherUser)).length.should.equal(4);
  }

  @test
  async tagsForPhotoID() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const anotherUser: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    await this._store.addStringTagToPhoto('tag1', photo, user);
    await this._store.addCostumeTagToPhoto(costume, photo, user);
    await this._store.addUserTagToPhoto(anotherUser, photo, user);
    (await this._store.findByPhotoID(photo.photoID))!.length.should.equal(3);
  }

  @test
  async addTagValueToPhoto() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const stringValue = 'string1';
    const anotherUser: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const stringTag: Tag =
        await this._store.addTagValueToPhoto(stringValue, photo, user);
    (await this._store.findOneByTagID(stringTag.tagID))!.string!.should.equal(
        stringValue);
    const costumeTag: Tag =
        await this._store.addTagValueToPhoto(costume, photo, user);
    const fetchedCostume: Costume =
        (await this._store.findOneByTagID(costumeTag.tagID))!.costume!;
    fetchedCostume.equalsCostume(costume).should.be.true(
        'Costumes did not match.');
    const userTag: Tag =
        await this._store.addTagValueToPhoto(anotherUser, photo, user);
    const fetchedUser: User =
        (await this._store.findOneByTagID(userTag.tagID))!.taggedUser!;
    fetchedUser.equalsUser(anotherUser).should.be.true('Users did not match.');
  }

  @test
  async photosForCostume() {
    const user: User = await this.createUser();
    const costume1: Costume = await this.createCostume();
    const photo1: Photo = await this.createPhoto();
    const photo2: Photo = await this.createPhoto();
    const photo3: Photo = await this.createPhoto();
    await this._store.addCostumeTagToPhoto(costume1, photo1, user);
    await this._store.addCostumeTagToPhoto(costume1, photo2, user);
    await this._store.addCostumeTagToPhoto(costume1, photo3, user);
    await this._store.addUserTagToPhoto(await this.createUser(), photo3, user);

    (await this._store.photosForCostumeID(
        costume1.costumeID))!.length.should.equal(3);
  }

  @test
  async photosForUser() {
    const user: User = await this.createUser();
    const otherUser: User = await this.createUser();
    const photo1: Photo = await this.createPhoto();
    const photo2: Photo = await this.createPhoto();
    const photo3: Photo = await this.createPhoto();
    await this._store.addUserTagToPhoto(otherUser, photo1, user);
    await this._store.addUserTagToPhoto(otherUser, photo2, user);
    await this._store.addUserTagToPhoto(otherUser, photo3, user);
    await this._store.addCostumeTagToPhoto(
        await this.createCostume(), photo3, user);

    (await this._store.photosForUserID(otherUser.userID))!.length.should.equal(
        3);
  }
}
