const Flickr = require('flickr-sdk');

/** Wraps the Flickr SDK's API. */
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
   * @return {Promise<dictionary>} The flickr API photo dictionary response.
   */
  async photoByID(ID) {
    return this.flickrSDK.photos
        .getInfo({
          photo_id: ID,
        })
        .then(function(flickrres) {
          return flickrres.body.photo;
        });
  }

  /**
   * Fetches the flickr photo located at the given flickr.com URL.
   * @param {string} URL - A flickr.com URL of the form:
   *        https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
   * @return {Promise<dictionary>} The flickr API photo dictionary response.
   */
  async photoByURL(URL) {
    let ID;
    try {
      ID = URL.split('/')[5];
    } catch (err) {
      throw new Error('Unable to obtain an ID from URL.');
    }
    return this.photoByID(ID);
  }

  /**
   * Fetches the contents of a flickr photo album.
   * @param {string} ID - The photo album's ID.
   * @param {string} userID - flickr's partial-numerical userID for the owner.
   *        of the album. Should be in the form #######@X##. (ex: 8036590@N05)
   * @return {Promise<[dictionary]>} The array of API photo dictionaries.
   */
  async albumContentsByIDAndUserID(ID, userID) {
    return this.flickrSDK.photosets.getPhotos({
      photoset_id: ID,
      user_id: userID,
      extras: 'tags,url_o,url_m,url_s,url_t,media',
    });
  }

  /**
   * Fetches flickr's partial-numerical userID for a given textual username.
   * @param {string} username - The username to query.
   * @return {Promise<string>} The userID for the username provided.
   */
  async userIDFromUsername(username) {
    return this.flickrSDK.people
        .findByUsername({
          username: username,
        })
        .then(function(flickrres) {
          return flickrres.body.user.id;
        });
  }
}

module.exports = FlickrFetcher;
