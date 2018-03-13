import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection, Types} from 'mongoose';
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
    super(
        photoModelFactory(connection), Photo,
        ['tags.addedBy', 'tags.statuses.setBy']);
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
   * Methods to add tags to photos.
   * @param value The tag to add.
   * @param photo The photo to modify.
   * @param addedByUser The user who is adding the tag.
   */
  async addStringTagToPhoto(value: string, photo: Photo, addedByUser: User) {
    return this.addTagToPhotoByKind(TagKind.String, value, photo, addedByUser);
  }
  async addCostumeTagToPhoto(value: Costume, photo: Photo, addedByUser: User) {
    return this.addTagToPhotoByKind(TagKind.Costume, value, photo, addedByUser);
  }
  async addUserTagToPhoto(value: User, photo: Photo, addedByUser: User) {
    return this.addTagToPhotoByKind(TagKind.User, value, photo, addedByUser);
  }

  /**
   * Adds a new tag to a photo from a kind and value.
   * @param kind The kind of tag to add.
   * @param value The value for the tag. The type of this value must match the
   * type of the tag.
   * @param photo The photo to add the tag.
   * @param addedByUser The user who is adding the tag.
   */
  private async addTagToPhotoByKind(
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
          throw new Error('Tag kind mismatch ' + kind + ' to ' + value);
        }
        tagModel.costume = value.document;
        break;
      }
      case TagKind.String: {
        if (!(typeof value === 'string')) {
          throw new Error('Tag kind mismatch ' + kind + ' to ' + value);
        }
        tagModel.string = value;
        break;
      }
      case TagKind.User: {
        if (!(value instanceof User)) {
          throw new Error('Tag kind mismatch ' + kind + ' to ' + value);
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

  /**
   * Removes a tag from a photo if it exists and returns that tag if successful.
   * @param tag The tag to remove from the photo.
   * @param photo The photo.
   * @returns The tag if it was removed
   */
  async removeTagFromPhoto(tagID: string, photo: Photo): Promise<void> {
    if (!photo.document.tags) {
      return;
    }
    photo.document.tags =
        photo.document.tags.filter((tag: TagModel) => tag.tagID === tagID);
    return this.update(photo);
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
   * Sets the approval state of a tag by appending a new approval state.
   * @param photo The photo which owns the tag.
   * @param tag The tag to modify.
   * @param state The new state to apply.
   * @param byUser The user applying the state.
   * @return The array of current statuses for the tag.
   */
  async setTagApprovalState(
      photo: Photo, tagID: string, state: ApprovalState,
      byUser: User): Promise<void> {
    if (!photo.tags) {
      throw new Error('There were no tags on the photo.');
    }
    for (let i = 0; i < photo.tags.length; i++) {
      const currentTag = photo.tags[i];
      if (currentTag.tagID === tagID) {
        const newStatus: ApprovalStatus = {
          state,
          setBy: byUser.document,
          dateAdded: new Date(),
        } as ApprovalStatus;

        currentTag.statuses.push(newStatus);
      }
    }

    return photo.document.save().then<void>();
  }
}
