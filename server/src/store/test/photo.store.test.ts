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
import {CostumeStore} from '../costume.store';
import {CostumeDocument, Costume} from '../../model/costume/costume';
import {generate as generateShortID} from 'shortid';

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
    const user: User = await this.createUser();
    const date: Date = new Date();
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
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
    const value = 'string';
    const user: User = await this.createUser();
    const tag: Tag =
        await this._store.addStringTagToPhoto(value, this._photo, user);
    chai.expect(tag).to.not.be.null('Tag was not created.');

    // Grab the photo from the store and verify the tag was added correctly.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhoto!.tags!.length.should.equal(1);
    const actualTag: Tag = fetchedPhoto!.tags![0];
    actualTag.kind.should.equal(TagKind.String);
    actualTag.string!.should.equal(value);
    actualTag.addedBy.userID.should.equal(user.userID);
    actualTag.statuses.length.should.equal(1);
    const actualStatus: ApprovalStatus = actualTag.statuses[0];
    const actualSetByUserDoc: UserDocument = actualStatus.setBy as UserDocument;
    actualSetByUserDoc.userID.should.equal(user.userID);
    actualStatus.state.should.equal(ApprovalState.New);
  }

  @test
  /** Tests adding string, costume, and user tags. */
  async multipleTagsAddedSuccessfully() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    await this._store.addStringTagToPhoto('string1', this._photo, user);
    await this._store.addCostumeTagToPhoto(costume, this._photo, user);
    await this._store.addUserTagToPhoto(user, this._photo, user);
    const fetchedPhotoMultiTags: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhotoMultiTags!.tags!.length.should.equal(3);
  }

  @test
  async tagsRemovedSuccessfully() {
    // Test remove specific tag.
    const user: User = await this.createUser();
    const tag: Tag =
        await this._store.addStringTagToPhoto('string1', this._photo, user);
    // Grab a fresh photo from the store.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhoto!.tags!.length.should.equal(1);
    await this._store.removeTagFromPhoto(tag.tagID, fetchedPhoto!);
    const expectNoTagPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    expectNoTagPhoto!.tags!.length.should.equal(0);

    // Test remove by value.
  }

  @test
  async tagSetApprovalStatus() {
    const user1: User = await this.createUser();
    const user2: User = await this.createUser();

    await this._store.addStringTagToPhoto('string1', this._photo, user1);
    // Grab a fresh photo from the store.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    fetchedPhoto!.tags!.length.should.equal(1);
    const fetchedTag: Tag = fetchedPhoto!.tags![0];
    fetchedTag.statuses.length.should.equal(1);
    fetchedTag.statuses[0].state.should.equal(ApprovalState.New);

    // Approve and then reject the tag.
    await this._store.setTagApprovalState(
        fetchedPhoto!, fetchedTag.tagID, ApprovalState.Approved, user1);
    await this._store.setTagApprovalState(
        fetchedPhoto!, fetchedTag.tagID, ApprovalState.Rejected, user2);

    const postUpdatePhoto: Photo|null =
        await this._store.findByPhotoID(this._photo.photoID);
    postUpdatePhoto!.tags!.length.should.equal(1);
    const postUpdateStatuses: ApprovalStatus[] =
        postUpdatePhoto!.tags![0].statuses;
    postUpdateStatuses.length.should.equal(3);
    postUpdateStatuses[0].state.should.equal(ApprovalState.New);
    (postUpdateStatuses[0].setBy as UserDocument)
        .userID.should.equal(user1.userID);
    postUpdateStatuses[1].state.should.equal(ApprovalState.Approved);
    (postUpdateStatuses[1].setBy as UserDocument)
        .userID.should.equal(user1.userID);
    postUpdateStatuses[2].state.should.equal(ApprovalState.Rejected);
    (postUpdateStatuses[2].setBy as UserDocument)
        .userID.should.equal(user2.userID);
  }

  @test
  async photosByTagValue() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const anotherUser: User = await this.createUser();
    // Add multiple tags to instance photo.
    await this._store.addStringTagToPhoto('tag1', this._photo, user);
    await this._store.addCostumeTagToPhoto(costume, this._photo, user);
    await this._store.addUserTagToPhoto(anotherUser, this._photo, user);

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

    (await this._store.findByTagValue('tag1')).length.should.equal(3);
    (await this._store.findByTagValue(costume)).length.should.equal(2);
    (await this._store.findByTagValue(anotherUser)).length.should.equal(4);
  }

  @test
  async photoFromFlickrPhotoAndUser() {
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const user: User = await this.createUser();
    const photo: Photo =
        await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto, user);
    chai.expect(photo).to.exist('Photo was not created.');
    photo.flickrPhoto!.flickrID.should.equal(flickrPhoto.flickrID);
    photo.postedBy.userID.should.equal(user.userID);
  }

  @test.skip
  async photosPostedByUser() {}

  @test.skip
  async photosCapturedByUser() {}

  @test.skip
  async photosByApproval() {}

  @test.skip
  async photoSetApprovalStatus() {}

  private async createPhoto(): Promise<Photo> {
    const store: PhotoStore = new PhotoStore(this._connection);
    const user: User = await this.createUser();
    const date: Date = new Date();
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const document: PhotoDocument = {
      flickrPhoto: flickrPhoto.document,
      dateAdded: date,
      postedBy: user.document,
      statuses: [{
        state: ApprovalState.New,
        setBy: user.document,
        dateAdded: date,
      } as ApprovalStatus]
    } as PhotoDocument;
    return store.create(document);
  }

  private async createFlickrPhoto(): Promise<FlickrPhoto> {
    const store: FlickrPhotoStore = new FlickrPhotoStore(this._connection);
    return store.create({
      flickrID: generateShortID(),
      title: '',
      description: '',
    } as FlickrPhotoDocument);
  }

  private async createUser(): Promise<User> {
    const store: UserStore = new UserStore(this._connection);
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return store.create({
      accounts: [account],
    } as UserDocument);
  }

  private async createCostume(): Promise<Costume> {
    return new CostumeStore(this._connection).create({} as CostumeDocument);
  }

  async after() {
    return this._connection.dropDatabase();
  }
}
