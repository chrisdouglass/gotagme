import {sign as signJWT} from 'jsonwebtoken';
import {Connection, Document, Model} from 'mongoose';
import {Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

import {Account} from '../account/account';
import {AccountDocument} from '../account/account.document';
import {accountSchema} from '../account/account.schema';
import {DocumentWrapper} from '../base/document_wrapper';
import {Costume} from '../costume/costume';
import {CostumeDocument} from '../costume/costume.document';
import {costumeSchema} from '../costume/costume.schema';

/**
 * Represents a User of the service.
 */
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
}

/**
 * Represents a User document in Mongo.
 */
export interface UserDocument extends Document {
  userID: string;
  displayName?: string;
  accounts: AccountDocument[];
  costumes?: CostumeDocument[];
}

/**
 * Private schema definition. Keep in sync with the above Document.
 */
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
  costumes: {
    type: [costumeSchema],
  },
});

export const userModelFactory =
    (connection: Connection): Model<UserDocument> => {
      return connection.model<UserDocument>('user', userSchema, 'users');
    };

export type UserIDMap = {
  [x: string]: User
};
