import {Schema} from 'mongoose';
import * as shortid from 'shortid';

import {accountSchema} from '../account/account.schema';
import {costumeSchema} from '../costume/costume.schema';

import {UserDocument} from './user.document';

export const userSchema: Schema = new Schema({
  userID: {type: String, required: true, default: shortid.generate},
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
