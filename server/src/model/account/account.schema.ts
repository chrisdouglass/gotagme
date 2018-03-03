import {Schema} from 'mongoose';

export const accountSchema: Schema = new Schema({
  serverID: {type: String},
  oauthToken: {type: String, required: true},
  oauthSecret: {type: String, required: true},
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
});
