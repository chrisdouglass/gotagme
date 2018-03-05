import * as jwt from 'jsonwebtoken';
import * as mongoose from 'mongoose';

import {Account} from '../account/account';
import {DocumentWrapper} from '../base/document_wrapper';
import {Costume} from '../costume/costume';

import {UserDocument} from './user.document';
import {userSchema} from './user.schema';

export type UserIDMap = {
  [x: string]: User
};

export class User extends DocumentWrapper<UserDocument> {
  constructor(userModel: UserDocument) {
    super(userModel);
  }

  get userID(): string {
    return this.model.userID;
  }

  get displayName(): string|undefined {
    return this.model.displayName;
  }

  get accounts(): Account[] {
    return this.model.accounts.map((accountDocument) => {
      return new Account(accountDocument);
    });
  }

  get costumes(): Costume[]|undefined {
    return !this.model.costumes ? undefined :
                                  this.model.costumes.map((costumeDocument) => {
                                    return new Costume(costumeDocument);
                                  });
  }

  createJWT() {
    return jwt.sign(
        {id: this.userID}, process.env.PASSPORT_JWT_SECRET, {expiresIn: '24h'});
  }

  accountWithOAuthKeys(oauthToken: string, oauthString: string): Account
      |undefined {
    this.accounts.find((value: Account) => {
      return value.oauthToken === oauthToken &&
          value.oauthSecret === oauthString;
    });
    return undefined;
  }
}
Object.seal(User);

export const userModelFactory = (connection: mongoose.Connection) => {
  return connection.model<UserDocument>('user', userSchema, 'users');
};
