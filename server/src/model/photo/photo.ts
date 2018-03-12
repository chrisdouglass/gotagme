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
    return this.document.photoID;
  }

  get dateAdded(): Date {
    return this.document.dateAdded;
  }

  get postedBy(): User {
    return new User(this.document.postedBy);
  }

  get capturedBy(): User|undefined {
    return this.document.capturedBy ? new User(this.document.capturedBy) :
                                      undefined;
  }

  // TODO: Add flickr photo ref?

  get tags(): Tag[]|undefined {
    const models: TagModel[]|undefined = this.document.tags;
    if (!models) {
      return undefined;
    }
    return models.map<Tag>(Tag.fromModel);
  }

  get statuses(): ApprovalStatus[] {
    return this.document.statuses;
  }

  get flickrPhoto(): FlickrPhoto|undefined {
    return !this.document.flickrPhoto ?
        undefined :
        new FlickrPhoto(this.document.flickrPhoto);
  }
}

export class Tag {
  kind: TagKind;
  user?: User;
  costume?: Costume;
  string?: string;
  addedBy: User;
  statuses: ApprovalStatus[];
  model: TagModel;

  constructor(model: TagModel) {
    this.kind = model.kind;
    this.user = model.user ? new User(model.user) : undefined;
    this.costume = model.costume ? new Costume(model.costume) : undefined;
    this.addedBy = new User(model.addedBy);
    this.statuses = model.statuses;
    this.model = model;
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
  string?: string;
  addedBy: UserDocument;
  statuses: ApprovalStatus[];
}

export enum TagKind {
  User = 'user',
  Costume = 'costume',
  String = 'string',
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
