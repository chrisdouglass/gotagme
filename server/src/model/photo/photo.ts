import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

import {ApprovalState} from '../../common/types';
import {DocumentWrapper} from '../base/document_wrapper';
import {Costume, CostumeDocument} from '../costume/costume';
import {User, UserDocument} from '../user/user';

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
    return this.model.photoID;
  }

  get dateAdded(): Date {
    return this.model.dateAdded;
  }

  get postedBy(): User {
    return new User(this.model.postedBy);
  }

  get capturedBy(): User|undefined {
    return this.model.capturedBy ? new User(this.model.capturedBy) : undefined;
  }

  // TODO: Add flickr photo ref?

  get tags(): Tag[]|undefined {
    const models: TagModel[]|undefined = this.model.tags;
    if (!models) {
      return undefined;
    }
    return models.map<Tag>(Tag.fromModel);
  }

  get statuses(): ApprovalStatus[] {
    return this.model.statuses;
  }

  get flickrPhoto(): FlickrPhoto|undefined {
    return !this.model.flickrPhoto ? undefined :
                                     new FlickrPhoto(this.model.flickrPhoto);
  }
}

export class Tag {
  kind: TagKind;
  user?: User;
  costume?: Costume;
  addedBy: User;
  statuses: ApprovalStatus[];

  constructor(model: TagModel) {
    this.kind = model.kind;
    this.user = model.user ? new User(model.user) : undefined;
    this.costume = model.costume ? new Costume(model.costume) : undefined;
    this.addedBy = new User(model.addedBy);
    this.statuses = model.statuses;
  }

  static fromModel(model: TagModel) {
    return new Tag(model);
  }
}

/**
 * Documents and models.
 */

export interface PhotoDocument extends Document {
  photoID: string;
  dateAdded: Date;
  postedBy: UserDocument;
  capturedBy?: UserDocument;
  flickrPhoto?: FlickrPhotoDocument;
  // TODO: Add favorites.
  tags?: TagModel[];
  statuses: ApprovalStatus[];
}

export interface TagModel {
  kind: TagKind;
  user?: UserDocument;
  costume?: CostumeDocument;
  addedBy: UserDocument;
  statuses: ApprovalStatus[];
}

export enum TagKind {
  User,
  Costume,
}

export interface ApprovalStatus {
  state: ApprovalState;
  setBy: UserDocument;
  dateAdded: Date;
}

/**
 * Photo mongoose.Model factory.
 * @param connection The mongoose connection to use for the model.
 */
export const photoModelFactory = (connection: mongoose.Connection) => {
  return connection.model<PhotoDocument>('photo', photoSchema, 'photos');
};
