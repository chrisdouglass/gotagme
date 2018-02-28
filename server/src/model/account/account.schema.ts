import {Schema} from 'mongoose';

export const accountSchema: Schema = new Schema({
  oauthToken: {type: String, required: true},
  oauthSecret: {type: String, required: true},
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
});
