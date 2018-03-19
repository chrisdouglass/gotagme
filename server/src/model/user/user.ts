import {sign as signJWT} from 'jsonwebtoken';
import {Connection, Document, Model, Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

import {JSONResponse} from '../../common/types';
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
    return this.document.displayName;
  }

  get accounts(): Account[] {
    return this.document.accounts.map((accountDocument) => {
      return new Account(accountDocument);
    });
  }

  createJWT() {
    return signJWT(
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

  equalsUser(user: User) {
    return this.userID === user.userID;
  }

  toJSON(): JSONResponse {
    const json: JSONResponse = {
      userID: this.userID,
      objectID: this.objectID,
    };
    if (this.displayName) {
      json.displayName = this.displayName;
    }
    return json;
  }
}

/** Represents a User document in Mongo. */
export interface UserDocument extends Document {
  userID: string;
  displayName?: string;
  accounts: AccountDocument[];

  createdAt: Date;
  updatedAt: Date;
}

// clang-format off
/** Private schema definition. Keep in sync with the above Document. */
const userSchema: Schema = new Schema({
  userID: {type: String, required: true, default: generateShortID},
  displayName: String,
  accounts: {
    type: [accountSchema],
    // Must disable tslint as arrow notation results in a syntax error.
    // tslint:disable-next-line:object-literal-shorthand
    required: function(this: UserDocument) {
      return this.accounts.length > 0;
    },
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
