/**
 * Wraps the Flickr SDK's API.
 */
const Flickr = require('flickr-sdk');

class FlickrFetcher {
  /**
   * Returns a new fetcher using the default API key.
   * @return {FlickrFetcher} A new default API key fetcher.
   */
  static default() {
    return FlickrFetcher.fromAPIKey(process.env.FLICKR_API_KEY);
  }

  /**
   * Returns a new fetcher using the given flickr API key.
   * @param {string} APIKey - The key to use for authentication.
   * @return {FlickrFetcher} A new fetcher using the provided key.
   */
  static fromAPIKey(APIKey) {
    return new FlickrFetcher(new Flickr(APIKey));
  }

  /**
   * @constructor
   * @param {flickr-sdk.Flickr} flickrSDK - An instance of the flickr SDK API
   *        object or null if the default credentials should be used.
   */
  constructor(flickrSDK) {
    this.flickrSDK = flickrSDK;
  }

  /**
   * Fetches the flickr photo with the given flickr ID.
   * @param {string} ID - The ID of the photo to fetch.
   * @param {Promise<dictionary>} The flickr API photo dictionary response.
   */
  async photoByID(ID) {
    return this.flickrSDK.photos.getInfo({
      photo_id: ID,
    }).then(function(flickrres) {
      return flickrres.body.photo;
    });
  }

  /**
   * Fetches the flickr photo located at the given flickr.com URL.
   * @param {string} URL - A flickr.com URL of the form:
   *        https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
   * @param {Promise<dictionary>} The flickr API photo dictionary response.
   */
  async photoByURL(URL) {
    const ID = URL.split('/')[5];
    return this.photoByID(ID);
  }

  /**
   * Callback type for FlickrPhoto collection callbacks.
   * @callback flickrPhotoCollectionCallback
   * @param {dictionary[]} photos
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
