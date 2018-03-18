import {Connection, Document, Model, Schema} from 'mongoose';

import {JSONResponse} from '../../common/types';
import {DocumentWrapper} from '../base/document_wrapper';
import {Photo, PhotoDocument} from '../photo';
import {Tag, TagDocument} from '../tag';
import {User, UserDocument} from '../user';

export enum ApprovalState {
  New = 'new',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class ApprovalStatus extends DocumentWrapper<ApprovalStatusDocument> {
  get state(): ApprovalState {
    return this.document.state;
  }

  get setBy(): User {
    return new User(this.document.setBy as UserDocument);
  }

  get type(): ApprovalStatusType {
    return this.document.type;
  }

  get photo(): Photo|undefined {
    return this.document.photo && new Photo(this.document.photo);
  }

  get tag(): Tag|undefined {
    return this.document.tag && new Tag(this.document.tag);
  }

  toJSON(): JSONResponse {
    return {
      'state': this.state,
      'setBy': this.setBy.userID,
    } as JSONResponse;
  }
}

export interface ApprovalStatusDocument extends Document {
  state: ApprovalState;
  setBy: UserDocument|Schema.Types.ObjectId;
  createdAt: Date;
  photo: PhotoDocument;
  tag: TagDocument;
  type: ApprovalStatusType;
}

export enum ApprovalStatusType {
  Photo = 'photo',
  Tag = 'tag',
}

export const approvalStateSchema = {
  type: String,
  enum: ['new', 'approved', 'rejected'],
  required: true,
  default: 'new',
};

export const approvalStatusSchema = new Schema({
  state: approvalStateSchema,
  setBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {type: Date, required: true, default: Date.now},
  type: {
    type: String,
    enum: ['photo', 'tag'],
  },
  photo: {
    type: Schema.Types.ObjectId,
    ref: 'Photo',
  },
  tag: {
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  },
});

/**
 * ApprovalStatus mongoose.Model factory.
 * @param connection The mongoose connection to use for the model.
 */
export const approvalStatusModel =
    (connection: Connection): Model<ApprovalStatusDocument> =>
        connection.model<ApprovalStatusDocument>(
            'ApprovalStatus', approvalStatusSchema, 'approvalStatuses');
