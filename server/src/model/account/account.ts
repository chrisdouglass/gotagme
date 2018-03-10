import * as mongoose from 'mongoose';

import {DocumentWrapper} from '../base/document_wrapper';

import {AccountDocument} from './account.document';
import {accountSchema} from './account.schema';

export class Account extends DocumentWrapper<AccountDocument> {
  constructor(accountModel: AccountDocument) {
    super(accountModel);
  }

  get serverID(): string|undefined {
    return this.model.serverID;
  }

  get oauthToken(): string {
    return this.model.oauthToken;
  }

  get oauthSecret(): string {
    return this.model.oauthSecret;
  }

  get displayName(): string|undefined {
    return this.model.displayName;
  }

  get username(): string|undefined {
    return this.model.username;
  }

  updateFromTwitterProfile(profile: {}) {
    console.log(profile);
  }
}

export const accountModel =
    mongoose.model<AccountDocument>('account', accountSchema, 'accounts');
