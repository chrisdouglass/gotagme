import * as mongoose from 'mongoose';
import * as shortid from 'shortid';

import { UserDocument } from './user.document';

import { accountSchema } from '../account/account.schema';
import { costumeSchema } from '../costume/costume.schema';

export const userSchema: mongoose.Schema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    default: shortid.generate
  },
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
