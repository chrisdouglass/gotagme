import {sign as signJWT} from 'jsonwebtoken';
import {Connection, Document, Model, Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

import {JSONResponse} from '../../common/types';
import {huskysoft} from '../../protos';
import {Account, AccountDocument, accountSchema} from '../account';
import {DocumentWrapper} from '../base/document_wrapper';

/** Represents a User of the service. */
export class User extends DocumentWrapper<UserDocument> {
  constructor(userModel: UserDocument) {
    super(userModel);
  }

  get userID(): string {
    return this.document.userID;
  }

  get displayName(): string|undefined {
    return this.accounts &&
        (this.accounts[0].displayName || '@' + this.accounts[0].username);
  }

  get accounts(): Account[]|undefined {
    return this.document.accounts &&
        this.document.accounts.map((accountDocument) => {
          return new Account(accountDocument);
        });
  }

  createJWT() {
    return signJWT(
        {id: this.userID}, process.env.PASSPORT_JWT_SECRET, {expiresIn: '5m'});
  }

  equalsUser(user: User) {
    return this.userID === user.userID;
  }

  toProto(): huskysoft.gotagme.user.User {
    return huskysoft.gotagme.user.User.create({
      id: this.userID,
      displayName: this.displayName,
    });
  }

  toJSON(): JSONResponse {
    return this.toProto().toJSON();
  }
}

/** Represents a User document in Mongo. */
export interface UserDocument extends Document {
  userID: string;
  accounts?: AccountDocument[];

  createdAt: Date;
  updatedAt: Date;
}

// clang-format off
/** Private schema definition. Keep in sync with the above Document. */
const userSchema: Schema = new Schema({
  userID: {type: String, required: true, default: generateShortID},
  accounts: {
    type: [accountSchema],
  },
}, {timestamps: true});
// clang-format on

/**
 * Creates a model factory used by the stores to generate model objects.
 * @param connection The mongoose connection to use for persistence.
 */
export const userModel = (connection: Connection): Model<UserDocument> =>
    connection.model<UserDocument>('User', userSchema, 'users');

export type UserIDMap = {
  [x: string]: User
};
