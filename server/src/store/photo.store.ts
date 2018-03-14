import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection, Types} from 'mongoose';
import {Url} from 'url';

import {FlickrFetcher} from '../flickr/flickr_fetcher';
import {ApprovalState, ApprovalStatus} from '../model/base/approval';
import {Costume} from '../model/costume';
import {Photo, PhotoDocument, photoModel} from '../model/photo';
import {FlickrPhoto} from '../model/photo';
import {User} from '../model/user';

import {FlickrPhotoStore} from './flickr_photo.store';
import {Store} from './store';

/** Manages photos in the database. */
export class PhotoStore extends Store<PhotoDocument, Photo> {
  private _fetcher: FlickrFetcher;
  private _flickrStore: FlickrPhotoStore;
  private _connection: Connection;

  constructor(connection: Connection) {
    super(
        photoModel(connection), Photo,
        'statuses flickrPhoto postedBy approvalStatus.setBy');
    this._connection = connection;
    this._fetcher = FlickrFetcher.default();
    this._flickrStore = new FlickrPhotoStore(this._connection);
  }

  /** METHODS FOR CREATING PHOTOS. */

  /**
   * Adds a new photo to the store based on a given flickr Url and user.
   * @param url The Url of the page on flickr for the image.
   * @param user The user who is posting the image.
   * @returns The newly inserted photo or an existing photo if it already exists
   * for the Url.
   */
  // TODO: Add tests by injecting a fake flickr fetcher and store.
  async createFromFlickrUrlPostedByUser(url: Url, user: User): Promise<Photo> {
    const existingFlickrPhoto: FlickrPhoto|null =
        await this._flickrStore.findByFlickrPageUrl(url);
    if (existingFlickrPhoto) {
      const photo: Photo|null = await this.findOne({
        flickrPhoto: existingFlickrPhoto.document,
      });
      if (photo) {
        return photo;
      } else {
        // TODO: Log warning/error.
      }
    }

    const apiPhoto: APIPhoto|undefined = await this._fetcher.photoByUrl(url);
    if (!apiPhoto) {
      throw new Error(
          'Unable to create a flickr API photo from url ' + url.href);
    }
    const flickrPhoto: FlickrPhoto = existingFlickrPhoto ?
        existingFlickrPhoto :
        await this._flickrStore.fromFlickrAPIPhoto(apiPhoto);
    return this.createFromFlickrPhotoPostedByUser(flickrPhoto, user);
  }

  /**
   * Creates a new photo from the given FlickrPhoto and User.
   * @param flickrPhoto The flickrPhoto as the photo's base.
   * @param user The user to add the photo.
   * @returns The newly added photo.
   */
  async createFromFlickrPhotoPostedByUser(flickrPhoto: FlickrPhoto, user: User):
      Promise<Photo> {
    const existing: Photo|null = await this.findOne({
      flickrPhoto: flickrPhoto.document,
    });
    if (existing) {
      return existing;
    }

    const date: Date = new Date();
    const status: ApprovalStatus = {
      state: ApprovalState.New,
      setBy: user.document,
      dateAdded: date,
    } as ApprovalStatus;
    const document: PhotoDocument = {
      flickrPhoto: flickrPhoto.document,
      postedBy: user.document,
      dateAdded: date,
      statuses: [status],
      currentStatus: status,
    } as PhotoDocument;
    return this.create(document);
  }

  /** METHODS FOR FINDING PHOTOS. */

  /**
   * Gets an existing photo if it already exists.
   * @param photoID The photo's ID.
   * @returns The photo if it exists or null.
   */
  async findByPhotoID(photoID: string): Promise<Photo|null> {
    return this.findOne({photoID});
  }

  /**
   * Returns all Photos with the given tag value.
   * @param value The value to look for in tags.
   */
  async findByTagValue(value: Costume|User|string): Promise<Photo[]> {
    let conditions: {[_: string]: string|Types.ObjectId} = {};
    if (typeof value === 'string') {
      conditions = {'tags.string': value};
    } else if (value instanceof Costume) {
      conditions = {'tags.costume': value.objectID};
    } else {
      conditions = {'tags.user': value.objectID};
    }
    return this.find(conditions);
  }

  /**
   * Returns photos posted by a user.
   * @param user The user who posted the photos.
   */
  async findPostedBy(user: User): Promise<Photo[]> {
    return this.find({
      'postedBy': user.document,
    });
  }

  /**
   * Returns photos captured by a user.
   * @param user The user who captured the photos.
   */
  async findCapturedBy(user: User): Promise<Photo[]> {
    return this.find({
      'capturedBy': user.document,
    });
  }

  async findByApproval(approvalState: ApprovalState) {
    return this.find({
      'currentStatus.state': approvalState,
    });
  }
}
