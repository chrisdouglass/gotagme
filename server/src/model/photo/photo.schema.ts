import {Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';
import {approvalStatusSchema} from '../base/approval';

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

  statuses: {
    type: [approvalStatusSchema],
    required: true,
  },
  currentStatus: {
    type: approvalStatusSchema,
    required: true,
  },

  // TODO: Add favorites.

  // TODO: Remove this dependency.
  flickrPhoto: {
    type: Schema.Types.ObjectId,
    ref: 'FlickrPhoto',
    required: true,
  },
}, {timestamps: true});
// clang-format on
