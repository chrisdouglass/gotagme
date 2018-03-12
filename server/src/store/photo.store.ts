import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection} from 'mongoose';
import {Url} from 'url';

import {ApprovalState} from '../common/types';
import {FlickrFetcher} from '../flickr/flickr_fetcher';
import {Costume} from '../model/costume/costume';
import {Photo, PhotoDocument, photoModelFactory} from '../model/photo';
import {FlickrPhoto} from '../model/photo/flickr_photo';
import {ApprovalStatus, Tag, TagKind, TagModel} from '../model/photo/photo';
import {User} from '../model/user/user';

import {FlickrPhotoStore} from './flickr_photo.store';
import {Store} from './store';

/** Manages photos in the database. */
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
    const date: Date = new Date();
    const document: PhotoDocument = {
      flickrPhoto: flickrPhoto.document,
      postedBy: user.document._id,
      dateAdded: date,
      statuses: [{
        state: ApprovalState.New,
        setBy: user.document,
        dateAdded: date,
      } as ApprovalStatus]
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

  /**
   * Adds a new tag to a photo from a kind and value.
   * @param kind The kind of tag to add.
   * @param value The value for the tag. The type of this value must match the
   * type of the tag.
   * @param photo The photo to add the tag.
   * @param addedByUser The user who is adding the tag.
   */
  async addTagToPhotoByKind(
      kind: TagKind, value: Costume|User|string, photo: Photo,
      addedByUser: User): Promise<Tag> {
    const tagModel: TagModel = {
      kind,
      addedBy: addedByUser.document,
      statuses: [{
        state: ApprovalState.New,
        setBy: addedByUser.document,
        dateAdded: new Date()
      } as ApprovalStatus]
    } as TagModel;
    switch (kind) {
      case TagKind.Costume: {
        if (!(value instanceof Costume)) {
          throw new Error(
              'Tag kind mismatch ' + kind + ' to ' + value.toString);
        }
        tagModel.costume = value.document;
        break;
      }
      case TagKind.String: {
        if (!(typeof value === 'string')) {
          throw new Error(
              'Tag kind mismatch ' + kind + ' to ' + value.toString);
        }
        tagModel.string = value;
        break;
      }
      case TagKind.User: {
        if (!(value instanceof User)) {
          throw new Error(
              'Tag kind mismatch ' + kind + ' to ' + value.toString);
        }
        tagModel.user = value.document;
        break;
      }
      default: { throw new Error('Unhandled tag kind ' + kind); }
    }

    return this.addTagToPhoto(Tag.fromModel(tagModel), photo);
  }

  /**
   * Adds a tag to a photo.
   * @param tag The tag to add.
   * @param photo The photo for adding the tag.
   */
  async addTagToPhoto(tag: Tag, photo: Photo): Promise<Tag> {
    if (!photo.document.tags) {
      photo.document.tags = [] as TagModel[];
    }
    photo.document.tags.push(tag.model);
    await this.update(photo);
    return tag;
  }
}
