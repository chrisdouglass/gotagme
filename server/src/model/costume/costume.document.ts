import {Document} from 'mongoose';
import {UserDocument} from '../user/user.document';

export interface CostumeDocument extends Document {
  costumeID: string;
  names: string[];         // In order from first to last.
  owners: UserDocument[];  // In order from first to last.
}
