import {Schema} from 'mongoose';

import {UserDocument} from '../user';

export enum ApprovalState {
  New = 'new',
  Approved = 'approved',
  Rejected = 'rejected',
}

export class ApprovalStatus {
  state!: ApprovalState;
  setBy!: UserDocument|Schema.Types.ObjectId;
  createdAt!: Date;

  static from(state: ApprovalState, setBy: UserDocument) {
    return new ApprovalStatus(state, setBy);
  }

  constructor(state: ApprovalState, setBy: UserDocument) {
    this.state = state;
    this.setBy = setBy;
  }
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
  createdAt: {type: Date, required: true, default: Date.now},
};
