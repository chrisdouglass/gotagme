const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

/** Schema for representing a single photo in the service. */
const photoSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  dateAdded: {type: Date, required: true, default: Date.now()},
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
  /**
   * @constructor
   * @param {flickr-sdk.Flickr} flickrSDK - An instance of the flickr SDK API
   *        object.
   */
  constructor(postedByUser, flickrPhoto) {
    this.postedBy = postedByUser;
    this.flickrPhoto = flickrPhoto;
  }
}

photoSchema.loadClass(PhotoClass);
// Exports mongoose model w/ class.
module.exports = mongoose.model('Photo', photoSchema);
