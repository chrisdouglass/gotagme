import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

import {ApprovalStatus, approvalStatusSchema} from '../base/approval';
import {DocumentWrapper} from '../base/document_wrapper';
import {CostumeDocument} from '../costume/costume';
import {UserDocument} from '../user/user';

export class Tag extends DocumentWrapper<TagDocument> {
  constructor(tagModel: TagDocument) {
    super(tagModel);
  }

  static from(document: TagDocument): Tag {
    return new Tag(document);
  }
}

/** Represents a Tag document in Mongo. */
export interface TagDocument extends Document {
  tagID: string;
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

/** Private schema definition. Keep in sync with the above Document. */
export const tagSchema: Schema = new Schema({
  tagID: {
    type: String,
    required: true,
    default: generateShortID,
  },
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
  // An array of statuses representing the change history.
  statuses: {
    type: [approvalStatusSchema],
    required: true,
  }
});

/**
 * Creates a model factory used by the stores to generate model objects.
 * @param connection The mongoose connection to use for persistence.
 */
export const tagModel = mongoose.model<TagDocument>('Tag', tagSchema, 'tags');
