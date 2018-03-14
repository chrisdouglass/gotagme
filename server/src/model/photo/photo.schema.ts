// clang-format off
import {Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

// tslint:disable-next-line: no-any
const approvalStatusSchema: {[_: string]: any} = {
  state: {
    type: String,
    enum: ['new', 'approved', 'rejected'],
    required: true,
    default: 'new',
  },
  setBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dateAdded: {type: Date, required: true, default: Date.now},
};

export const photoSchema: Schema = new Schema({
  // _id shouldn't be overridden because it's used for referencing.
  photoID: {
    type: String,
    required: true,
    default: generateShortID,
  },

  dateAdded: {type: Date, required: true, default: Date.now},

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
});
// clang-format on
