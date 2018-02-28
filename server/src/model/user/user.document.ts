import * as mongoose from 'mongoose';

import {AccountDocument} from '../account/account.document';
import {CostumeDocument} from '../costume/costume.document';

export interface UserDocument extends mongoose.Document {
  userID: string;
  displayName?: string;
  accounts: AccountDocument[];
  costumes?: CostumeDocument[];
}
