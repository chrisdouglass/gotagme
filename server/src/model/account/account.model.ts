import * as mongoose from 'mongoose';

import {Model} from '../base/model';

import {AccountDocument} from './account.document';
import {accountSchema} from './account.schema';

export class Account extends Model<AccountDocument> {
  constructor(accountModel: AccountDocument) {
    super(accountModel);
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
}
Object.seal(Account);

export const accountModel =
    mongoose.model<AccountDocument>('account', accountSchema, 'accounts');
