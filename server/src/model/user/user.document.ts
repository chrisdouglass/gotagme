import * as mongoose from 'mongoose';

import { Account } from '../account/account.model';
import { Costume } from '../costume/costume.model';

export interface UserDocument extends mongoose.Document {
  userID: string;
  displayName?: string;
  accounts: Account[];
  costumes?: Costume[];
}
