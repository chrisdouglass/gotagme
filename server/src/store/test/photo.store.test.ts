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

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new PhotoStore(this._connection);
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new PhotoStore(this._connection);
  }

  @test
  async tagStringAddedSuccessfully() {
    const value = 'string';
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const tag: Tag =
        await this._store.addStringTagToPhoto(value, photo, user);
    chai.expect(tag).to.not.be.null('Tag was not created.');

    // Grab the photo from the store and verify the tag was added correctly.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(photo.photoID);
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
  /** Tests adding string, costume, and user tags together. */
  async multipleTagsAddedSuccessfully() {
    const user: User = await this.createUser();
    const costume: Costume = await this.createCostume();
    const photo: Photo = await this.createPhoto();
    await this._store.addStringTagToPhoto('string1', photo, user);
    await this._store.addCostumeTagToPhoto(costume, photo, user);
    await this._store.addUserTagToPhoto(user, photo, user);
    const fetchedPhotoMultiTags: Photo|null =
        await this._store.findByPhotoID(photo.photoID);
    fetchedPhotoMultiTags!.tags!.length.should.equal(3);
  }

  @test
  async tagsRemovedSuccessfully() {
    // Test remove specific tag.
    const user: User = await this.createUser();
    const photo: Photo = await this.createPhoto();
    const tag: Tag =
        await this._store.addStringTagToPhoto('string1', photo, user);

    // Grab a fresh photo from the store.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(photo.photoID);
    fetchedPhoto!.tags!.length.should.equal(1);
    await this._store.removeTagFromPhoto(tag.tagID, fetchedPhoto!);
    (await this._store.findByPhotoID(photo.photoID))!.tags!.length.should.equal(0);

    // Test remove by value.
    // TODO: This fails, however it's flakey. Seems to work sometimes when attached to the debugger.
    // The delete appears to work fine, but then when the image is refetched the tag is still there.
    // Fix and reenable.
    // const photo2: Photo = await this.createPhoto();
    // await this._store.addStringTagToPhoto('string2', photo2, user);
    // (await this._store.findByPhotoID(photo2.photoID))!.tags!.length.should.equal(1);
    // this._store.removeTagFromPhotoByValue('string2', photo2);
    // (await this._store.findByPhotoID(photo2.photoID))!.tags!.length.should.equal(0);
  }

  @test
  async tagSetApprovalStatus() {
    const user1: User = await this.createUser();
    const user2: User = await this.createUser();
    const photo: Photo = await this.createPhoto();

    await this._store.addStringTagToPhoto('string1', photo, user1);
    // Grab a fresh photo from the store.
    const fetchedPhoto: Photo|null =
        await this._store.findByPhotoID(photo.photoID);
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
        await this._store.findByPhotoID(photo.photoID);
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
    const photo: Photo = await this.createPhoto();

    // Add multiple tags to instance photo.
    await this._store.addStringTagToPhoto('tag1', photo, user);
    await this._store.addCostumeTagToPhoto(costume, photo, user);
    await this._store.addUserTagToPhoto(anotherUser, photo, user);

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

  @test
  async photosPostedByUser() {
    const flickrPhoto1User1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto2User1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto3User1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto1User2: FlickrPhoto = await this.createFlickrPhoto();
    const user1: User = await this.createUser();
    const user2: User = await this.createUser();
    await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto1User1, user1);
    await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto2User1, user1);
    await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto3User1, user1);
    await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto1User2, user2);
    (await this._store.findByPostedBy(user1)).length.should.equal(3);
    (await this._store.findByPostedBy(user2)).length.should.equal(1);
  }

  @test
  async photosCapturedByUser() {
    const flickrPhoto1: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto2: FlickrPhoto = await this.createFlickrPhoto();
    const flickrPhoto3: FlickrPhoto = await this.createFlickrPhoto();
    const postedByUser: User = await this.createUser();
    const capturedByUser: User = await this.createUser();
    const photo1: Photo = await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto1, postedByUser);
    photo1.document.capturedBy = capturedByUser.document;
    await this._store.update(photo1);
    const photo2: Photo = await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto2, postedByUser);
    photo2.document.capturedBy = capturedByUser.document;
    await this._store.update(photo2);
    await this._store.createFromFlickrPhotoPostedByUser(flickrPhoto3, postedByUser);
    (await this._store.fetchAll()).length.should.equal(3);
    (await this._store.findByCapturedBy(capturedByUser)).length.should.equal(2);
  }

  @test.skip
  async photosByApproval() {}

  @test.skip
  async photoSetApprovalStatus() {}

  @test.skip
  async photosByCurrentApprovalStatus() {}

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
