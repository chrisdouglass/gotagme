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
   *        data needed for a new photo. This function expects 'flickrURL' as
   *        part of the request body.
   * @return {Promise<Photo>} The new photo as inserted into the database.
   */
  static async insertPhotoFromRequest(request) {
    const user = request.user;
    if (!user) {
      throw this.errorWithMessageAndStatus('Not logged in.', 403);
    }
    const flickrURL = request.body.flickrURL;
    return flickrFetcher.photoByURL(flickrURL).then((APIPhoto) => {
      const builder = new PhotoBuilder(APIPhoto, user);
      return builder.build();
    }).then(this.savePhoto).then(this.populatePhoto);
  }

  /**
   * Updates an existing photo based on an Express request containing the photo
   * and saves the object if successful.
   * @param {express.Request} request - The request from which to obtain the
   *        data needed for a new photo. This function expects 'id' as part of
   *        the request params and 'photo' as part of the request body.
   * @return {Promise<Photo>} The updated photo as saved in the database.
   */
  static async updatePhotoFromRequest(request) {
    const user = request.user;
    if (!user) {
      throw this.errorWithMessageAndStatus('Not logged in.', 403);
    }

    const requestPhoto = request.body.photo;
    if (!requestPhoto) {
      throw this.errorWithMessageAndStatus('No photo provided.', 403);
    }

    if (!request.params.id) {
      throw this.errorWithMessageAndStatus('No photoID provided.', 403);
    }

    // TODO: Actually implement photo updating.
    return Photo.findOne({photoID: request.params.id}).then(this.populatePhoto);
  }

  /**
   * Gets an existing photo based on an Express request containing the photoID.
   * @param {express.Request} request - The request from which to obtain the
   *        data needed for a new photo. This function expects 'id' as part of
   *        the request params.
   * @return {Promise<Photo>} The photo.
   */
  static async getPhotoFromRequest(request) {
    if (!request.params.id) {
      throw this.errorWithMessageAndStatus('No photoID provided.', 403);
    }

    return Photo.findOne({photoID: request.params.id}).then(this.populatePhoto);
  }

  static async populatePhoto(photo) {
    return Photo.populate(photo, {
      path: "flickrPhoto postedBy"
    });
  }

  static async savePhoto(photo) {
    return photo.save();
  }

  static errorWithMessageAndStatus(message, status) {
    const err = new Error(message);
    err.status = status;
    return err;
  }
}

module.exports = PhotoManager;
