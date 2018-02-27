import * as mongoose from 'mongoose';

export const accountSchema = new mongoose.Schema({
  oauthToken: {type: String, required: true},
  oauthSecret: {type: String, required: true},
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
});
