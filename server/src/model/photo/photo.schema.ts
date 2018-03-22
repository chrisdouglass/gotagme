import {Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

// clang-format off
export const photoSchema: Schema = new Schema({
  // _id shouldn't be overridden because it's used for referencing.
  photoID: {
    type: String,
    required: true,
    default: generateShortID,
  },

  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  capturedBy: {type: Schema.Types.ObjectId, ref: 'User'},

  currentState: {
    type: String,
    enum: ['new', 'approved', 'rejected'],
    default: 'new',
  },

  // TODO: Add favorites.

  maxNumberOfCostumes: Number,

  // TODO: Remove this dependency.
  flickrPhoto: {
    type: Schema.Types.ObjectId,
    ref: 'FlickrPhoto',
    required: true,
  },
}, {timestamps: true});
// clang-format on
