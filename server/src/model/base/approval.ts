import {Schema} from 'mongoose';

import {UserDocument} from '../user/user';

export enum ApprovalState {
  New = 'new',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface ApprovalStatus {
  state: ApprovalState;
  setBy: UserDocument|Schema.Types.ObjectId;
  dateAdded: Date;
}

// tslint:disable-next-line: no-any
export const approvalStatusSchema: {[_: string]: any} = {
  state: {
    type: String,
    enum: ['new', 'approved', 'rejected'],
    required: true,
    default: 'new',
  },
  setBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateAdded: {type: Date, required: true, default: Date.now},
};
