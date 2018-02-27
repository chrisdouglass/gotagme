import * as mongoose from 'mongoose';

export interface AccountDocument extends mongoose.Document {
  oauthToken: string;
  oauthSecret: string;
  displayName?: string;
  username?: string;
}
