const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

/* Schema for representing a single photo in the service. */
const photoSchema = new Schema({
  // _id shouldn't be overridden because it's used for referencing.
  photoID: {
    type: String,
    required: true,
    default: shortid.generate,
  },

  dateAdded: {type: Date, required: true, default: Date.now},

  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  capturedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},

  // TODO: Add favorites.

  // TODO: Remove this dependency.
  flickrPhoto: {
    type: mongoose.Schema.Types.ObjectId,
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
      user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
      costume: {type: mongoose.Schema.Types.ObjectId, ref: 'Costume'},
      addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      // An array of statuses representing the change history.
      approvalStatus: {
        type: [{
          status: {
            type: String,
            enum: ['new', 'approved', 'rejected'],
            required: true,
            default: 'new',
          },
          setBy: {
            type: mongoose.Schema.Types.ObjectId,
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

/**
 * Represents a photo from any source.
 * @alias Photo
 */
class PhotoClass {
  toJSON() {
    let json = {
      photoID: this.photoID,
      dateAdded: this.dateAdded,
      postedBy: {
        displayName: this.postedBy.displayName,
        userID: this.postedBy.userID,
      },
      tags: this.tags,
    };

    if (this.capturedBy) {
      json[capturedBy] = {
        displayName: this.capturedBy.displayName,
        userID: this.capturedBy.userID,
      };
    }

    return json;
  }
}

photoSchema.loadClass(PhotoClass);
// Exports mongoose model w/ class.
const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
