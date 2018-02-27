import * as mongoose from 'mongoose';
import { UserDocument } from './user.document';
import { userSchema } from './user.schema';

export class User {
  private _model: UserDocument;

  private constructor(userModel: UserDocument) {
    this._model = userModel;
  }

  get displayName(): string | undefined {
    return this._model.displayName;
  }
}
Object.seal(User);

export const userModel = mongoose.model<UserDocument>('user', userSchema, 'users');
