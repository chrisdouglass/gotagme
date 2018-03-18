import {Connection, Document, Model, Schema} from 'mongoose';
import {Url} from 'url';

import {ApprovalState} from '../approval';
import {DocumentWrapper} from '../base/document_wrapper';
import {User, UserDocument} from '../user';

import {FlickrPhoto, FlickrPhotoDocument} from './flickr_photo';
import {photoSchema} from './photo.schema';

/**
 * Wrappers.
 */

export class Photo extends DocumentWrapper<PhotoDocument> {
  constructor(photoModel: PhotoDocument) {
    super(photoModel);
  }

  get photoID(): string {
    return this.document.photoID;
  }

  get title(): string|undefined {
    return this.flickrPhoto && this.flickrPhoto.title;
  }

  get description(): string|undefined {
    return this.flickrPhoto && this.flickrPhoto.description;
  }

  get postedBy(): User {
    return new User(this.document.postedBy as UserDocument);
  }

  get capturedBy(): User|undefined {
    return this.document.capturedBy ?
        new User(this.document.capturedBy as UserDocument) :
        undefined;
  }

  get currentState(): ApprovalState {
    return this.document.currentState;
  }

  get capturedAt(): number|undefined {
    return this.flickrPhoto && this.flickrPhoto.captureDate;
  }

  get serverID(): string|undefined {
    return this.flickrPhoto && this.flickrPhoto.flickrID;
  }

  get flickrUrl(): Url|undefined {
    return this.flickrPhoto && this.flickrPhoto.flickrPageUrl;
  }

  get flickrSmallImageUrl(): Url|undefined {
    return this.flickrPhoto && this.flickrPhoto.smallImageUrl;
  }

  get flickrLargeImageUrl(): Url|undefined {
    return this.flickrPhoto && this.flickrPhoto.largeImageUrl;
  }

  get flickrXLargeImageUrl(): Url|undefined {
    return this.flickrPhoto && this.flickrPhoto.xlargeImageUrl;
  }

  get flickrOriginalImageUrl(): Url|undefined {
    return this.flickrPhoto && this.flickrPhoto.origImageUrl;
  }

  equalsPhoto(photo: Photo) {
    return this.photoID === photo.photoID;
  }

  toJSON() {
    return {
      photoID: this.photoID,
      title: this.title,
      description: this.description,
      postedBy: this.postedBy.userID,
      capturedBy: this.capturedBy && this.capturedBy.userID,
      capturedAt: this.capturedAt,
      state: this.currentState,
      flickrUrl: this.flickrUrl && this.flickrUrl.href,
      smallImageUrl: this.flickrSmallImageUrl && this.flickrSmallImageUrl.href,
      largeImageUrl: this.flickrLargeImageUrl && this.flickrLargeImageUrl.href,
      xlargeImageUrl:
          this.flickrXLargeImageUrl && this.flickrXLargeImageUrl.href,
      originalImageUrl:
          this.flickrOriginalImageUrl && this.flickrOriginalImageUrl.href,
    };
  }

  private get flickrPhoto(): FlickrPhoto|undefined {
    return !(this.document.flickrPhoto as FlickrPhotoDocument) ?
        undefined :
        new FlickrPhoto(this.document.flickrPhoto as FlickrPhotoDocument);
  }
}

/**
 * Documents and models.
 */

export interface PhotoDocument extends Document {
  photoID: string;
  postedBy: UserDocument|Schema.Types.ObjectId;
  capturedBy?: UserDocument|Schema.Types.ObjectId;
  flickrPhoto?: FlickrPhotoDocument|Schema.Types.ObjectId;
  currentState: ApprovalState;  // Should always match the last status.

  createdAt: Date;
  updatedAt: Date;
}

export const photoDocumentFactory =
    (flickrPhoto: FlickrPhotoDocument, postedBy: UserDocument):
        PhotoDocument => {
          return {
            flickrPhoto,
            postedBy,
          } as PhotoDocument;
        };

/**
 * Photo mongoose.Model factory.
 * @param connection The mongoose connection to use for the model.
 */
export const photoModel = (connection: Connection): Model<PhotoDocument> =>
    connection.model<PhotoDocument>('Photo', photoSchema, 'photos');
