import {Flickr, NSID, Request} from 'flickr-sdk';

/** Wraps the Flickr SDK's API. */
export class FlickrFetcher {
  private _flickr: Flickr;

  /**
   * Returns a new fetcher using the default API key.
   * @return A new default API key fetcher.
   */
  static default() {
    return FlickrFetcher.fromAPIKey(process.env.FLICKR_API_KEY);
  }

  /**
   * Returns a new fetcher using the given flickr API key.
   * @param apiKey The key to use for authentication.
   * @return A new fetcher using the provided key.
   */
  static fromAPIKey(apiKey: string): FlickrFetcher {
    return new FlickrFetcher(new Flickr(apiKey));
  }

  /**
   * @constructor
   * @param flickrSDK An instance of the flickr SDK API object.
   */
  constructor(flickrSDK: Flickr) {
    this._flickr = flickrSDK;
  }

  /**
   * Fetches the flickr photo with the given flickr ID.
   * @param ID The ID of the photo to fetch.
   * @return The flickr API photo dictionary response.
   */
  async photoByID(ID: string): Promise<{}|undefined> {
    const response: Request = await this._flickr.photos.getInfo({photo_id: ID});
    return response.body ? response.body.photo : undefined;
  }

  /**
   * Fetches the flickr photo located at the given flickr.com URL.
   * @param URL A flickr.com URL of the form:
   *        https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
   * @return The flickr API photo dictionary response.
   */
  async photoByURL(URL: string): Promise<{}|undefined> {
    let ID;
    try {
      ID = URL.split('/')[5];
    } catch (err) {
      throw new Error('Unable to obtain an ID from URL ' + URL);
    }
    return this.photoByID(ID);  // Outside of try so caller can catch.
  }

  /**
   * Fetches the contents of a flickr photo album.
   * @param ID The photo album's ID.
   * @param nsid The owner's NSID.
   * @return The array of API photo dictionaries.
   */
  async albumContentsByIDAndUserID(ID: string, nsid: NSID):
      Promise<[{}]|undefined> {
    const response: Request = await this._flickr.photosets.getPhotos({
      photoset_id: ID,
      user_id: nsid,
      extras: 'tags,url_o,url_m,url_s,url_t,media',
    });
    return response.body ? response.body.photoset : undefined;
  }

  /**
   * Fetches flickr's NSID for a given username.
   * @param username The username to query.
   * @return The NSID for the username provided.
   */
  async userIDFromUsername(username: string): Promise<NSID|undefined> {
    const response: Request =
        await this._flickr.people.findByUsername({username});
    return response.body ? response.body.user.id : undefined;
  }
}