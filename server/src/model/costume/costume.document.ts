import * as mongoose from 'mongoose';
import { User } from '../user/user.model';

export interface CostumeDocument extends mongoose.Document {
  costumeID: string;
  names: string[];
  owners: User[];
}
