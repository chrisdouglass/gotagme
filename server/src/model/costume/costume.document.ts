import {Document} from 'mongoose';
import {User} from '../user/user';

export interface CostumeDocument extends Document {
  costumeID: string;
  names: string[];
  owners: User[];
}
