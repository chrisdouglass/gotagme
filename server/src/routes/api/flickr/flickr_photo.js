const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flickrPhotoSchema = new Schema({
  id: String,
  title: String,
  description: String,
  uploadDate: Date,
  captureDate: Date,
  owner: {
    id: String,
    username: String,
    displayName: String,
    realName: String,
  },
  flickrPageURL: String,
  smallImageURL: String,
  mediumImageURL: String,
  largeImageURL: String,
  xlargeImageURL: String,
  origImageURL: String,
  tags: [{
    tag: String,
    displayName: String,
    userID: String,
    userDisplayName: String,
  }],
});

/**
 * Represents a photo on the flickr service.
 * @alias FlickrPhoto
 */
class FlickrPhotoClass {}

flickrPhotoSchema.loadClass(FlickrPhotoClass);
// Exports mongoose model w/ class.
const FlickrPhoto = mongoose.model('FlickrPhoto', flickrPhotoSchema);
module.exports = FlickrPhoto;
