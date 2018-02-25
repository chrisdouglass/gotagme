var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var flickrPhotoSchema = new Schema({
    id: String,
    title: String,
    description: String,
    uploadDate: Date,
    captureDate: Date,
    owner: {
        id: String,
        username: String,
        displayName: String,
        realName: String
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
            userDisplayName: String
        }]
});
/**
 * Represents a photo on the flickr service.
 * @alias FlickrPhoto
 */
var FlickrPhotoClass = /** @class */ (function () {
    function FlickrPhotoClass() {
    }
    return FlickrPhotoClass;
}());
flickrPhotoSchema.loadClass(FlickrPhotoClass);
// Exports mongoose model w/ class.
var FlickrPhoto = mongoose.model('FlickrPhoto', flickrPhotoSchema);
module.exports = FlickrPhoto;
