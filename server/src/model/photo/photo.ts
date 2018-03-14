import {Connection, Document, Model, Schema} from 'mongoose';

import {ApprovalState} from '../../common/types';
import {ApprovalStatus} from '../base/approval';
import {DocumentWrapper} from '../base/document_wrapper';
import {User, UserDocument} from '../user';

import {FlickrPhoto, FlickrPhotoDocument} from './flickr_photo';
import {photoSchema} from './photo.schema';

/**
 * Wrappers.
 */

export class Photo extends DocumentWrapper<PhotoDocument> {
  constructor(photoModel: PhotoDocument) {
    super(photoModel, ['postedBy', 'capturedBy']);
  }

  get photoID(): string {
    return this.document.photoID;
  }

  get dateAdded(): Date {
    return this.document.dateAdded;
  }

  get postedBy(): User {
    return new User(this.document.postedBy as UserDocument);
  }

  get capturedBy(): User|undefined {
    return this.document.capturedBy ?
        new User(this.document.capturedBy as UserDocument) :
        undefined;
  }

  get statuses(): ApprovalStatus[] {
    return this.document.statuses;
  }

  get currentStatus(): ApprovalStatus {
    return this.document.currentStatus;
  }

  setApprovalState(state: ApprovalState, setBy: User) {
    if (state === ApprovalState.New) {
      throw new Error('Cannot reset the approval state of a photo to New.');
    }
    if (!this.document.statuses) {
      this.document.statuses = [];
    }
    const status = {
      state,
      setBy: setBy.document,
      dateAdded: new Date(),
    } as ApprovalStatus;
    this.document.currentStatus = status;
    this.document.statuses.push(status);
  }

  get flickrPhoto(): FlickrPhoto|undefined {
    return !this.document.flickrPhoto ?
        undefined :
        new FlickrPhoto(this.document.flickrPhoto as FlickrPhotoDocument);
  }
}

/**
 * Documents and models.
 */

export interface PhotoDocument extends Document {
  photoID: string;
  dateAdded: Date;
  postedBy: UserDocument|Schema.Types.ObjectId;
  capturedBy?: UserDocument|Schema.Types.ObjectId;
  flickrPhoto?: FlickrPhotoDocument|Schema.Types.ObjectId;
  statuses: ApprovalStatus[];
  currentStatus: ApprovalStatus;  // Should always match the last status.
}

/**
 * Photo mongoose.Model factory.
 * @param connection The mongoose connection to use for the model.
 */
export const photoModel = (connection: Connection): Model<PhotoDocument> =>
    connection.model<PhotoDocument>('Photo', photoSchema, 'photos');
