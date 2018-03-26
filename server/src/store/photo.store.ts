import {Connection} from 'mongoose';

import {ApprovalState, ApprovalStatus} from '../model/approval';
import {Photo, PhotoDocument, photoModel} from '../model/photo';
import {FlickrPhoto} from '../model/photo';
import {photoDocumentFactory} from '../model/photo/photo';
import {User} from '../model/user';

import {ApprovalStore} from './approval.store';
import {Store} from './store';

/** Manages photos in the database. */
export class PhotoStore extends Store<PhotoDocument, Photo> {
  private _connection: Connection;

  constructor(connection: Connection) {
    super(photoModel(connection), Photo, [
      {path: 'flickrPhoto'}, {path: 'postedBy'}
    ]);
    this._connection = connection;
  }

  /** METHODS FOR CREATING PHOTOS. */
  async create(document: PhotoDocument): Promise<Photo> {
    const photo: Photo = await super.create(document);
    const status: ApprovalStatus =
        await new ApprovalStore(this._connection)
            .createNewPhotoStatus(photo, photo.postedBy);
    photo.document.currentState = status.document.state;
    await this.update(photo);
    return photo;
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
      'currentState': approvalState,
    });
  }
}
