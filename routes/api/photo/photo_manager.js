const Photo = require('./photo.js');
const FlickrPhoto = require('../flickr/flickr_photo.js');
const PhotoBuilder = require('./photo_builder.js');
const FlickrFetcher = require('../flickr/flickr_fetcher.js');
const flickrFetcher = FlickrFetcher.default();

/** Manages Photos in the database. */
class PhotoManager {
  /**
   * Inserts a new photo based on an Express request containing the data needed
   * for a new photo and saves the object if successful.
   * @param {express.Request} request - The request from which to obtain the
   *        data needed for a new photo. This function expects the following
   *        values to exist: request.session.user, request.session.flickrURL.
   * @return {Promise<Photo>} The new photo as inserted into the database.
   */
  static async insertPhotoFromRequest(request) {
    const user = request.session.user;
    const flickrURL = request.body.flickrURL;
    return flickrFetcher.photoByURL(flickrURL).then((APIPhoto) => {
      const builder = new PhotoBuilder(APIPhoto, user);
      return builder.build();
    }).then((photo) => {
      photo.save();
      return photo;
    });
  }
}

module.exports = PhotoManager;
