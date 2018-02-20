const Photo = require('./photo.js');
const FlickrPhoto = require('../flickr/flickr_photo.js');
const PhotoBuilder = require('./photo_builder.js');
const FlickrFetcher = require('../flickr/flickr_fetcher.js');
const flickrFetcher = FlickrFetcher.default(); // TODO: inject this?

/** Manages Photos in the database. */
class PhotoManager {
  /**
   * Inserts a new photo based on an Express request containing the data needed
   * for a new photo and saves the object if successful.
   * @param {express.Request} request - The request from which to obtain the
   *        data needed for a new photo. This function expects the following
   *        session values to exist: user, flickrURL.
   * @return {Promise<Photo>} The new photo as inserted into the database.
   */
  static async insertPhotoFromRequest(request) {
    const user = request.user;
    if (!user) {
      const err = new Error('Not logged in.');
      err.status = 403;
      throw err;
    }
    const flickrURL = request.body.flickrURL;
    return flickrFetcher.photoByURL(flickrURL).then((APIPhoto) => {
      const builder = new PhotoBuilder(APIPhoto, user);
      return builder.build();
    }).then(this.savePhoto).then(this.populatePhoto);
  }

  static async updatePhotoFromRequest(req) {
    if (!req.body.photoID) {
      const err = new Error('No photo ID provided.');
      err.status = 403;
      throw err;
    }

    const user = request.user;
    if (!user) {
      const err = new Error('Not logged in.');
      err.status = 403;
      throw err;
    }

    throw 'Not implemented.';
  }

  static async populatePhoto(photo) {
    return Photo.populate(photo, {
      path: "postedBy"
    });
  }

  static async savePhoto(photo) {
    return photo.save();
  }
}

module.exports = PhotoManager;
