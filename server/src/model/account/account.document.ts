import {Document} from 'mongoose';

export interface AccountDocument extends Document {
  serverID?: string;
  oauthToken: string;
  oauthSecret: string;
  displayName?: string;
  username?: string;
}
