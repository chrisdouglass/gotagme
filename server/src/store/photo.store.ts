import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection} from 'mongoose';
import {Url} from 'url';

import {FlickrFetcher} from '../flickr/flickr_fetcher';
import {Photo, PhotoDocument, photoModelFactory} from '../model/photo';
import {FlickrPhoto} from '../model/photo/flickr_photo';
import {User} from '../model/user/user';

import {FlickrPhotoStore} from './flickr_photo.store';
import {Store} from './store';

export class PhotoStore extends Store<PhotoDocument, Photo> {
  private _fetcher: FlickrFetcher;
  private _flickrStore: FlickrPhotoStore;
  private _connection: Connection;

  constructor(connection: Connection) {
    super(photoModelFactory(connection), Photo);
    this._connection = connection;
    this._fetcher = FlickrFetcher.default();
    this._flickrStore = new FlickrPhotoStore(this._connection);
  }

  /**
   * Adds a new photo to the store based on a given flickr Url and user.
   * @param url The Url of the page on flickr for the image.
   * @param user The user who is posting the image.
   * @returns The newly inserted photo or an existing photo if it already exists
   * for the Url.
   */
  async photoFromFlickrUrlAndUser(url: Url, user: User): Promise<Photo> {
    const existingFlickrPhoto: FlickrPhoto|null =
        await this._flickrStore.findByFlickrPageUrl(url);
    if (existingFlickrPhoto) {
      const photo: Photo|null = await this.findOne({
        flickrPhoto: existingFlickrPhoto.document._id,
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
    return this.photoFromFlickrPhotoAndUser(flickrPhoto, user);
  }

  /**
   * Creates a new photo from the given FlickrPhoto and User.
   * @param flickrPhoto The flickrPhoto as the photo's base.
   * @param user The user to add the photo.
   * @returns The newly added photo.
   */
  async photoFromFlickrPhotoAndUser(flickrPhoto: FlickrPhoto, user: User):
      Promise<Photo> {
    const document: PhotoDocument = {
      flickrPhoto: flickrPhoto.document,
      postedBy: user.document,
    } as PhotoDocument;
    return this.create(document);
  }

  /**
   * Gets an existing photo if it already exists.
   * @param photoID The photo's ID.
   * @returns The photo if it exists or null.
   */
  async findByPhotoID(photoID: string): Promise<Photo|null> {
    return this.findOne({photoID});
  }
}
