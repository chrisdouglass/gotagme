const FlickrPhoto = require('./flickr_photo.js');

/**
 * Wraps the Flickr SDK's API.
 */
class FlickrFetcher {
  /**
   * @constructor
   * @param {flickr-sdk.Flickr} flickrSDK - An instance of the flickr SDK API
   *        object.
   */
  constructor(flickrSDK) {
    this.flickrSDK = flickrSDK;
  }

  /**
   * Callback type for FlickrPhoto callbacks.
   * @callback flickrPhotoCallback
   * @param {FlickrPhoto} photo
   * @param {error} err
   */

  /**
   * Fetches the flickr photo with the given flickr ID.
   * @param {string} ID - The ID of the photo to fetch.
   * @param {flickrPhotoCallback} callback - The response handler.
   */
  fetchPhotoByID(ID, callback) {
    this.flickrSDK.photos.getInfo({
      photo_id: ID,
    }).then(function(flickrres) {
      callback(FlickrPhoto.fromFlickrAPIPhoto(flickrres.body.photo), null);
    }).catch(function(err) {
      console.log(err);
      callback(null, err);
    });
  }

  /**
   * Fetches the flickr photo located at the given flickr.com URL.
   * @param {string} URL - A flickr.com URL of the form:
   *        https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
   * @param {flickrPhotoCallback} callback - The response handler.
   */
  fetchPhotoByURL(URL, callback) {
    const ID = URL.split('/')[5];
    this.fetchPhotoByID(ID, callback);
  }

  /**
   * Callback type for FlickrPhoto collection callbacks.
   * @callback flickrPhotoCollectionCallback
   * @param {FlickrPhoto[]} photos
   * @param {error} err
   */

  // TODO: Consider moving to a seperate endpoint?
  /**
   * Fetches the contents of a flickr photo album.
   * @param {string} ID - The photo album's ID.
   * @param {string} userID - flickr's partial-numerical user_id for the owner
   *        of the album. Should be in the form #######@X##. (ex: 8036590@N05)
   * @param {flickrPhotoCollectionCallback} callback - The response handler.
   */
  fetchAlbumContentsByIDAndUserID(ID, userID, callback) {
    this.flickrSDK.photosets.getPhotos({
      photoset_id: ID,
      user_id: userID,
      extras: 'tags,url_o,url_m,url_s,url_t,media',
    }).then(function(flickrres) {
      callback(flickrres, null);
    }).catch(function(err) {
      callback(null, err);
    });
  }

  /**
   * Callback type for the flickr user ID query.
   * @callback flickrUserIDCallback
   * @param {string} userID
   * @param {error} err
   */

  // TODO: Obviously move this out of here.
  /**
   * Fetches flickr's partial-numerical user_id for a given textual username.
   * @param {string} username - The username to query.
   * @param {flickrUserIDCallback} callback - The response handler.
   */
  getUserIDFromUsername(username, callback) {
    this.flickrSDK.people.findByUsername({
      username: username,
    }).then(function(flickrres) {
      callback(flickrres.body.user.id, null);
    }).catch(function(err) {
      callback(null, err);
    });
  }
}

module.exports = FlickrFetcher;
