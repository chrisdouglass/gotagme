import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection} from 'mongoose';
import {Url} from 'url';

import {FlickrFetcher} from '../flickr/flickr_fetcher';
import {ApprovalState, ApprovalStatus} from '../model/base/approval';
import {Photo, PhotoDocument, photoModel} from '../model/photo';
import {FlickrPhoto} from '../model/photo';
import {photoDocumentFactory} from '../model/photo/photo';
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
        [{path: 'flickrPhoto'}, {path: 'postedBy'}, {path: 'statuses'}]);
    this._connection = connection;
    this._fetcher = FlickrFetcher.default();
    this._flickrStore = new FlickrPhotoStore(this._connection);
  }

  /**
   * Override to update current status.
   */
  async create(doc: PhotoDocument) {
    const statuses: ApprovalStatus[] = doc.statuses;
    doc.currentStatus = statuses[statuses.length - 1];
    return super.create(doc);
  }
  async update(photo: Photo): Promise<void> {
    photo.updateCurrentStatus();
    return super.update(photo);
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
        await this._flickrStore.findOneByFlickrPageUrl(url);
    // TODO: Reduce to one search.
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

    // Check again this isn't a duplicate. This can happen if the url provided doesn't match exactly
    // the url provided by flickr.
    const fetchedByID: FlickrPhoto|null = await this._flickrStore.findOneByFlickrID(apiPhoto.id!);
    // TODO: Reduce to one search.
    if (fetchedByID) {
      const photo: Photo|null = await this.findOne({
        flickrPhoto: fetchedByID.document,
      });
      if (photo) {
        return photo;
      } else {
        // TODO: Log warning/error.
      }
    }

    const flickrPhoto: FlickrPhoto = existingFlickrPhoto ?
        existingFlickrPhoto :
        await this._flickrStore.fromFlickrAPIPhoto(apiPhoto);
    return this.createFromFlickrPhotoPostedByUser(flickrPhoto, user);
  }

  async createFromFlickrUrlsPostedByUser(urls: Url[], user: User): Promise<Photo[]> {
    const results: Photo[] = await Promise.all(urls.map((url: Url) => {
      return this.createFromFlickrUrlPostedByUser(url, user);
    }));
    console.log(results);
    return results;
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

    const document: PhotoDocument =
        photoDocumentFactory(flickrPhoto.document, user.document);
    return this.create(document);
  }

  /** METHODS FOR FINDING PHOTOS. */

  /**
   * Gets an existing photo if it already exists.
   * @param photoID The photo's ID.
   * @returns The photo if it exists or null.
   */
  async findByPhotoID(photoID?: string): Promise<Photo|null> {
    return this.findOne({photoID});
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
