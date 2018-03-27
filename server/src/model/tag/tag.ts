import {Connection, Model} from 'mongoose';
import {Document, Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

import {JSONResponse, StringAnyMap} from '../../common/types';
import {huskysoft} from '../../protos';
import {protoApprovalStateFrom} from '../../protos/conversion';
import {ApprovalState} from '../approval/approval';
import {DocumentWrapper} from '../base/document_wrapper';
import {Costume, CostumeDocument} from '../costume';
import {Photo, PhotoDocument} from '../photo';
import {User, UserDocument} from '../user';

export class Tag extends DocumentWrapper<TagDocument> {
  constructor(tagModel: TagDocument) {
    super(tagModel);
  }

  equalsValue(value: Costume|User|string): boolean {
    if (!value) {
      throw new Error('No value provided.');
    }
    switch (this.kind) {
      case TagKind.Costume: {
        return this.document.costume === (value as Costume).document;
      }
      case TagKind.User: {
        return this.document.user === (value as User).document;
      }
      case TagKind.String: {
        return this.document.string === (value as string);
      }
      default: { throw new Error('Unhandled tag kind ' + this.kind); }
    }
  }

  get tagID(): string {
    return this.document.tagID;
  }

  get kind(): TagKind {
    return this.document.kind;
  }

  get tagText(): string {
    switch (this.kind) {
      case TagKind.String:
        return '#' + this.string;
      case TagKind.User:
        return '@' + this.taggedUser!.displayName;
      case TagKind.Costume:
        return '$' + this.costume!.name;
      default: { throw new Error('Unhandled tag kind ' + this.kind); }
    }
  }

  get addedBy(): User {
    return new User(this.document.addedBy as UserDocument);
  }

  get costume(): Costume|undefined {
    return !this.document.costume ?
        undefined :
        new Costume(this.document.costume as CostumeDocument);
  }

  get taggedUser(): User|undefined {
    return !this.document.user ? undefined :
                                 new User(this.document.user as UserDocument);
  }

  get string(): string|undefined {
    return this.document.string;
  }

  get value(): Costume|User|string|undefined {
    return this.costume || this.taggedUser || this.string;
  }

  get currentState(): ApprovalState {
    return this.document.currentState;
  }

  get photo(): Photo {
    return new Photo(this.document.photo);
  }

  equalsTag(tag: Tag) {
    return this.tagID === tag.tagID;
  }

  toProto(): huskysoft.gotagme.tag.Tag {
    const key: StringAnyMap = {
      kind: this.kind,
    };
    switch (this.kind) {
      case TagKind.Costume:
        key.costumeID = this.costume!.costumeID;
        break;
      case TagKind.User:
        key.taggedUserID = this.taggedUser!.userID;
        break;
      case TagKind.String:
        key.hashtag = this.string;
        break;
      default:
        break;
    }
    return huskysoft.gotagme.tag.Tag.create({
      id: this.tagID,
      tag: this.tagText,
      photo: this.photo.toProto(),
      addedBy: this.addedBy.toProto(),
      createdAt: this.document.createdAt.getTime() / 1000,
      key: JSON.stringify(key),
      display: this.string || (this.costume && this.costume.name) ||
          (this.taggedUser && this.taggedUser.displayName),
      costume: this.costume && this.costume.toProto(),
      taggedUser: this.taggedUser && this.taggedUser.toProto(),
      hashtag: this.string,
      state: protoApprovalStateFrom(this.currentState),
    });
  }

  toJSON(): JSONResponse {
    return this.toProto().toJSON();
  }
}

/** Represents a Tag document in Mongo. */
export interface TagDocument extends Document {
  tagID: string;
  photo: PhotoDocument;
  kind: TagKind;
  user?: UserDocument|Schema.Types.ObjectId;
  costume?: CostumeDocument|Schema.Types.ObjectId;
  string?: string;
  addedBy: UserDocument|Schema.Types.ObjectId;
  currentState: ApprovalState;  // Should always match the last status.

  createdAt: Date;
  updatedAt: Date;
}

export enum TagKind {
  User = 'user',
  Costume = 'costume',
  String = 'string',
}

// clang-format off
/** Private schema definition. Keep in sync with the above Document. */
export const tagSchema: Schema = new Schema({
  tagID: {
    type: String,
    required: true,
    default: generateShortID,
  },
  photo: {type: Schema.Types.ObjectId, ref: 'Photo'},
  kind: {
    type: String,
    enum: ['user', 'costume', 'string'],
    required: true,
  },
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  costume: {type: Schema.Types.ObjectId, ref: 'Costume'},
  string: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  currentState: {
    type: String,
    enum: ['new', 'approved', 'rejected'],
    default: 'new',
  },
},
{timestamps: true});
// clang-format on

/**
 * Creates a model factory used by the stores to generate model objects.
 * @param connection The mongoose connection to use for persistence.
 */
export const tagModel = (connection: Connection): Model<TagDocument> =>
    connection.model<TagDocument>('Tag', tagSchema, 'tags');
