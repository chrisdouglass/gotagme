import {Document} from 'mongoose';

export interface AccountDocument extends Document {
  oauthToken: string;
  oauthSecret: string;
  displayName?: string;
  username?: string;
}
