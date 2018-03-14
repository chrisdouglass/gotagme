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

  // Tags are references to either a user or a costume. This is an array.
  tags: {
    // An array of subdocuments.
    type: [{
      tagID: {
        type: String,
        required: true,
        default: generateShortID,
      },
      kind: {
        type: String,
        enum: ['user', 'costume', 'string'],
        required: true,
      },
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      costume: {type: Schema.Types.ObjectId, ref: 'Costume'},
      string: String,
      addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      // An array of statuses representing the change history.
      statuses: {
        type: [approvalStatusSchema],
        required: true,
      }
    }],
  },
});
// clang-format on
