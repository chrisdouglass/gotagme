const mongoose = require('mongoose');
const Schema = mongoose.Schema;



/**
 * Represents a photo on the flickr service.
 * @alias FlickrPhoto
 */
class FlickrPhotoClass {}

flickrPhotoSchema.loadClass(FlickrPhotoClass);
// Exports mongoose model w/ class.
const FlickrPhoto = mongoose.model('FlickrPhoto', flickrPhotoSchema);
module.exports = FlickrPhoto;
