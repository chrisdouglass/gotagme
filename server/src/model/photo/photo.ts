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

  /** Override to update currentStatus. */
  save() {
    this.updateCurrentStatus();
    return super.save();
  }

  get photoID(): string {
    return this.document.photoID;
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

  updateCurrentStatus() {
    const statuses = this.statuses;
    this.document.currentStatus = statuses[statuses.length - 1];
  }

  get uploadedToFlickrAt() {
    return !this.flickrPhoto ? undefined : this.flickrPhoto.uploadDate;
  }

  get capturedAt() {
    return !this.flickrPhoto ? undefined : this.flickrPhoto.captureDate;
  }

  get serverID() {
    return !this.flickrPhoto ? undefined : this.flickrPhoto.flickrID;
  }

  equalsPhoto(photo: Photo) {
    return this.photoID === photo.photoID;
  }

  setApprovalState(state: ApprovalState, setBy: User) {
    if (state === ApprovalState.New) {
      throw new Error('Cannot reset the approval state of a photo to New.');
    }
    if (!this.document.statuses) {
      this.document.statuses = [];
    }
    const status = ApprovalStatus.from(state, setBy.document);
    this.document.statuses.push(status);
  }

  private get flickrPhoto(): FlickrPhoto|undefined {
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
  // dateAdded: Date;
  postedBy: UserDocument|Schema.Types.ObjectId;
  capturedBy?: UserDocument|Schema.Types.ObjectId;
  flickrPhoto?: FlickrPhotoDocument|Schema.Types.ObjectId;
  statuses: ApprovalStatus[];
  currentStatus: ApprovalStatus;  // Should always match the last status.

  createdAt: Date;
  updatedAt: Date;
}

export const photoDocumentFactory =
    (flickrPhoto: FlickrPhotoDocument, postedBy: UserDocument):
        PhotoDocument => {
          const status: ApprovalStatus = {
            state: ApprovalState.New,
            setBy: postedBy,
          } as ApprovalStatus;
          return {
            flickrPhoto,
            postedBy,
            statuses: [status],
          } as PhotoDocument;
        };

/**
 * Photo mongoose.Model factory.
 * @param connection The mongoose connection to use for the model.
 */
export const photoModel = (connection: Connection): Model<PhotoDocument> =>
    connection.model<PhotoDocument>('Photo', photoSchema, 'photos');
