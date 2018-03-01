import {Schema} from 'mongoose';
import * as shortid from 'shortid';

export const costumeSchema: Schema = new Schema({
  costumeID: {type: String, default: shortid.generate, required: true},
  names: [String],
  owners: {
    type: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
});
