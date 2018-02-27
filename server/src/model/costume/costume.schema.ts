import * as mongoose from 'mongoose';
import * as shortid from 'shortid';

export const costumeSchema = new mongoose.Schema({
  costumeID: {type: String, default: shortid.generate},
  names: [String],
  owners: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  },
});
