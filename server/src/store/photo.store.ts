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

  async photoFromFlickrURLAndUser(url: Url, user: User): Promise<Photo> {
    const apiPhoto: APIPhoto|undefined = await this._fetcher.photoByURL(url);
    if (!apiPhoto) {
      throw new Error(
          'Unable to create a flickr API photo from url ' + url.href);
    }
    const flickrPhoto: FlickrPhoto =
        await this._flickrStore.fromFlickrAPIPhoto(apiPhoto);
    return this.photoFromFlickrPhotoAndUser(flickrPhoto, user);
  }

  async photoFromFlickrPhotoAndUser(flickrPhoto: FlickrPhoto, user: User) {
    const document: PhotoDocument = {
      flickrPhoto: flickrPhoto.document,
      postedBy: user.document,
    } as PhotoDocument;
    return this.create(document);
  }
}
