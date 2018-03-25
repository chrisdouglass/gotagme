import {Connection, Document, PaginateModel, Schema} from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate';
import {Url} from 'url';

import {JSONResponse} from '../../common/types';
import {ApprovalState} from '../approval';
import {DocumentWrapper} from '../base/document_wrapper';
import {User, UserDocument} from '../user';

import {FlickrPhoto, FlickrPhotoDocument} from './flickr_photo';
import {photoSchema} from './photo.schema';
import { huskysoft } from '../../protos/protos';
import { protoApprovalStateFrom } from '../../protos/conversion';

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

  get capturedAt(): Date|undefined {
    return this.flickrPhoto && this.flickrPhoto.captureDate;
  }

  get serverID(): string|undefined {
    return this.flickrPhoto && this.flickrPhoto.flickrID;
  }

  get flickrID(): string|undefined {
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

  get maxNumberOfCostumes(): number {
    return this.document.maxNumberOfCostumes;
  }

  set maxNumberOfCostumes(max: number) {
    this.document.maxNumberOfCostumes = max;
  }

  equalsPhoto(photo: Photo) {
    return this.photoID === photo.photoID;
  }

  toProto(): huskysoft.gotagme.models.Photo {
    return huskysoft.gotagme.models.Photo.create({
      id: this.photoID,
      title: this.title,
      description: this.description,
      postedBy: this.postedBy.toProto(),
      capturedBy: this.capturedBy && this.capturedBy.toProto(),
      capturedAt: this.capturedAt && this.capturedAt.getTime() / 1000,
      state: protoApprovalStateFrom(this.currentState),
      externalUrl: this.flickrUrl && this.flickrUrl.href,
      smallImageUrl: this.flickrSmallImageUrl && this.flickrSmallImageUrl.href,
      largeImageUrl: this.flickrLargeImageUrl && this.flickrLargeImageUrl.href,
      xlargeImageUrl:
          (this.flickrOriginalImageUrl && this.flickrOriginalImageUrl.href) ||
          (this.flickrXLargeImageUrl && this.flickrXLargeImageUrl.href),
    });
  }

  toJSON(): JSONResponse {
    return this.toProto().toJSON();
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

  // The maximum number of costumes/users which should be tagged.
  maxNumberOfCostumes: number;

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
export const photoModel =
    (connection: Connection): PaginateModel<PhotoDocument> =>
        connection.model<PhotoDocument>(
            'Photo', photoSchema.plugin(mongoosePaginate), 'photos') as
    PaginateModel<PhotoDocument>;
