import * as mongoose from 'mongoose';

import {DocumentWrapper} from '../base/document_wrapper';

import {UserDocument} from './user.document';
import {userSchema} from './user.schema';

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
}
Object.seal(User);

export const userModelFactory = (connection: mongoose.Connection) => {
  return connection.model<UserDocument>('user', userSchema, 'users');
};
