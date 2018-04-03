import * as chai from 'chai';
import {Mockgoose} from 'mockgoose';
import {MockgooseHelper} from 'mockgoose/built/mockgoose-helper';
import * as mongoose from 'mongoose';
import {Connection} from 'mongoose';
import {generate as generateShortID} from 'shortid';

import {AccountDocument} from '../model/account';
import {Costume} from '../model/costume';
import {FlickrPhoto, FlickrPhotoDocument, Photo, PhotoDocument, photoDocumentFactory} from '../model/photo';
import {User, UserDocument} from '../model/user';
import {ApprovalStore} from '../store/approval.store';
import {CostumeStore} from '../store/costume.store';
import {FlickrPhotoStore} from '../store/flickr_photo.store';
import {PhotoStore} from '../store/photo.store';
import {TagStore} from '../store/tag.store';
import {UserStore} from '../store/user.store';

export class DBTest {
  private static _connection: Connection;
  private static _mockgoose: Mockgoose;

  approvalStore!: ApprovalStore;
  costumeStore!: CostumeStore;
  flickrPhotoStore!: FlickrPhotoStore;
  photoStore!: PhotoStore;
  tagStore!: TagStore;
  userStore!: UserStore;

  static async before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.

    this._mockgoose = new Mockgoose(require('mongoose'));
    return this._mockgoose.prepareStorage().then(() => {
      DBTest._connection = mongoose.createConnection(
          process.env.TEST_DB_URL, {useMongoClient: true});
    });
  }

  async before() {
    this.approvalStore = new ApprovalStore(this.connection);
    this.costumeStore = new CostumeStore(this.connection);
    this.flickrPhotoStore = new FlickrPhotoStore(this.connection);
    this.photoStore = new PhotoStore(this.connection);
    this.tagStore = new TagStore(this.connection);
    this.userStore = new UserStore(this.connection);
  }

  get mockgooseHelper(): MockgooseHelper {
    return DBTest._mockgoose.helper;
  }

  get connection(): Connection {
    if (!DBTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return DBTest._connection;
  }

  async after() {
    return this.connection.dropDatabase();
  }

  static async after() {
    return DBTest._connection.close();
  }

  /**
   * Convenience functions.
   */

  async createUser(displayName?: string, username?: string): Promise<User> {
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
      displayName,
      username,
    } as AccountDocument;
    return this.userStore.create({
      accounts: [account],
    } as UserDocument);
  }

  /**
   * Directly inserts a photo document using Store::create.
   */
  async createPhoto(user?: User): Promise<Photo> {
    if (!user) {
      user = await this.createUser();
    }
    const flickrPhoto: FlickrPhoto = await this.createFlickrPhoto();
    const document: PhotoDocument =
        photoDocumentFactory(flickrPhoto.document, user.document);
    return this.photoStore.create(document);
  }

  /**
   * Inserts a new costume added by a new user.
   */
  async createCostume(name?: string, ownerID?: string): Promise<Costume> {
    return (new CostumeStore(this.connection))
        .createWith((await this.createUser()).userID, name, ownerID);
  }

  /**
   * Private.
   */

  async createFlickrPhoto(): Promise<FlickrPhoto> {
    return this.flickrPhotoStore.create({
      flickrID: generateShortID(),
      title: '',
      description: '',
    } as FlickrPhotoDocument);
  }
}
