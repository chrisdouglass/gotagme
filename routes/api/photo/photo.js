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
   * Makes a new Photo from a flickr API photo.
   * @param {User} user - The user creating the image.
   * @param {dictionary} APIPhoto - The photo response dictionary from flickr.
   * @return {Photo} A new photo initialized with the given flickr photo. The
   *         postedBy will not be set automatically and must be set before
   *         saving.
   */
  static createWithUserAndAPIPhoto(user, APIPhoto) {
    const flickrPhoto = FlickrPhoto.fromFlickrAPIPhoto(APIPhoto);
    return new PhotoClass(user, APIPhoto);
  }

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
