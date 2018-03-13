import {Connection, Document, Model, Schema} from 'mongoose';

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
        new FlickrPhoto(this.document.flickrPhoto as FlickrPhotoDocument);
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
    this.user = (model.user as UserDocument) ?
        new User(model.user as UserDocument) :
        undefined;
    this.costume = (model.costume as CostumeDocument) ?
        new Costume(model.costume as CostumeDocument) :
        undefined;
    this.string = model.string;
    this.addedBy = new User(model.addedBy as UserDocument);
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
  postedBy: UserDocument|Schema.Types.ObjectId;
  capturedBy?: UserDocument|Schema.Types.ObjectId;
  flickrPhoto?: FlickrPhotoDocument|Schema.Types.ObjectId;
  tags?: TagModel[];
  statuses: ApprovalStatus[];
}

export interface TagModel {
  kind: TagKind;
  user?: UserDocument|Schema.Types.ObjectId;
  costume?: CostumeDocument|Schema.Types.ObjectId;
  string?: string;
  addedBy: UserDocument|Schema.Types.ObjectId;
  statuses: ApprovalStatus[];
}

export enum TagKind {
  User = 'user',
  Costume = 'costume',
  String = 'string',
}

export interface ApprovalStatus {
  state: ApprovalState;
  setBy: UserDocument|Schema.Types.ObjectId;
  dateAdded: Date;
}

/**
 * Photo mongoose.Model factory.
 * @param connection The mongoose connection to use for the model.
 */
export const photoModelFactory =
    (connection: Connection): Model<PhotoDocument> =>
        connection.model<PhotoDocument>('Photo', photoSchema, 'photos');
