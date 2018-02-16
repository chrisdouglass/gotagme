const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

/* Schema for representing a single photo in the service. */
const photoSchema = new Schema({
  // _id can't be overridden because it's referenced in another model.
  photoID: {
    type: String,
    default: shortid.generate,
  },
  dateAdded: {type: Date, required: true, default: Date.now},
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  capturedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  costumes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Costume'}],
  // TODO: Add favorites.
  // TODO: Remove this dependency.
  flickrPhoto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FlickrPhoto',
    required: true,
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
      costumes: this.costumes,
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
