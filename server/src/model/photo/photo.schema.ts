import {Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';

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
      kind: {
        type: String,
        enum: ['user', 'costume'],
        required: true,
      },
      user: {type: Schema.Types.ObjectId, ref: 'User'},
      costume: {type: Schema.Types.ObjectId, ref: 'Costume'},
      addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      // An array of statuses representing the change history.
      approvalStatus: {
        type: [{
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
        }],
        required: true,
      }
    }],
  },
});
