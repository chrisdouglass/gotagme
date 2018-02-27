import * as mongoose from 'mongoose';

import {AccountDocument} from './account.document';
import {accountSchema} from './account.schema';

export class Account {
  private _model: AccountDocument;

  private constructor(accountModel: AccountDocument) {
    this._model = accountModel;
  }

  get oauthToken(): string {
    return this._model.oauthToken;
  }

  get oauthSecret(): string {
    return this._model.oauthSecret;
  }

  get displayName(): string|undefined {
    return this._model.displayName;
  }

  get username(): string|undefined {
    return this._model.username;
  }
}
Object.seal(Account);

export const accountModel =
    mongoose.model<AccountDocument>('account', accountSchema, 'accounts');
