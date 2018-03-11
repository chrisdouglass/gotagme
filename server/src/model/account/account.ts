import * as mongoose from 'mongoose';
import {Document} from 'mongoose';

import {DocumentWrapper} from '../base/document_wrapper';

export interface AccountDocument extends Document {
  serverID?: string;
  oauthToken: string;
  oauthSecret: string;
  displayName?: string;
  username?: string;
}

import {Schema} from 'mongoose';

export const accountSchema: Schema = new Schema({
  serverID: {type: String},
  oauthToken: {type: String, required: true},
  oauthSecret: {type: String, required: true},
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
});

export class Account extends DocumentWrapper<AccountDocument> {
  constructor(accountModel: AccountDocument) {
    super(accountModel);
  }

  get serverID(): string|undefined {
    return this.document.serverID;
  }

  get oauthToken(): string {
    return this.document.oauthToken;
  }

  get oauthSecret(): string {
    return this.document.oauthSecret;
  }

  get displayName(): string|undefined {
    return this.document.displayName;
  }

  get username(): string|undefined {
    return this.document.username;
  }

  updateFromTwitterProfile({}) {}
}

export const accountModel =
    mongoose.model<AccountDocument>('account', accountSchema, 'accounts');
