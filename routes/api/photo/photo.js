const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');
const FlickrPhoto = require('../flickr/flickr_photo.js');

/** Schema for representing a single photo in the service. */
const photoSchema = new Schema({
  _id: {
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
}, {_id: false}); // Don't generate the normal default id.

/**
 * Represents a photo from any source.
 * @alias Photo
 */
class PhotoClass {
}

photoSchema.loadClass(PhotoClass);
// Exports mongoose model w/ class.
const Photo = mongoose.model('Photo', photoSchema);
module.exports = Photo;
