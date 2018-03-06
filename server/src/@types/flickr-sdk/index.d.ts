declare module 'flickr-sdk' {
  export class Flickr {
    /**
     * Creates a new Flickr REST API client.
     *
     * You **must** pass a superagent plugin or your API key as the first
     * parameter. For methods that don't require authentication, you can simply
     * provide your API key. For methods that do require authentication,
     * use Flickr.OAuth.createPlugin.
     */
    constructor(authenticationPlugin: Function);
    constructor(apiKey: string);

    people: People;
    photos: Photos;
    photosets: Photosets;
  }

  export class Photos {
    /**
     * Get information about a photo. The calling user must have permission to view the photo.
     * @param api_key Your API application key. Optional if Flickr was constructed with a key.
     * @param photo_id The id of the photo to get information for.
     * @param secret The secret for the photo. If the correct secret is passed then permissions
     *        checking is skipped. This enables the 'sharing' of individual photos by passing around
     *        the id and secret.
     * @see https://www.flickr.com/services/api/flickr.photos.getInfo.html
     */
    getInfo(arguments: {
      api_key?: string,
      photo_id: string,
      secret?: string,
    }): Request;
  }

  export class Photosets {
    /**
     * Get the list of photos in a set.
     * @param api_key Your API application key. Optional if Flickr was constructed with a key.
     * @param photoset_id The id of the photoset to return the photos for.
     * @param user_id The user_id here is the owner of the set passed in photoset_id.
     * @param extras A comma-delimited list of extra information to fetch for each returned record.
     *        Currently supported fields are: license, date_upload, date_taken, owner_name,
     *        icon_server, original_format, last_update, geo, tags, machine_tags, o_dims, views,
     *        media, path_alias, url_sq, url_t, url_s, url_m, url_o
     * @param per_page Number of photos to return per page. If this argument is omitted, it defaults
     *        to 500. The maximum allowed value is 500.
     * @param page The page of results to return. If this argument is omitted, it defaults to 1.
     * @param privacy_filter Return photos only matching a certain privacy level. This only applies
     *        when making an authenticated call to view a photoset you own. Valid numbers are:
     *        1 (public photos), 2 (private photos visible to friends), 3 private photos visible to
     *        family, 4 (private photos visible to friends & family), 5 (completely private photos).
     * @param media Filter results by media type. Possible values are 'all' (default), 'photos' or
     *        'videos'.
     * @see https://www.flickr.com/services/api/flickr.people.getPhotos.html
     */
    getPhotos(arguments: {
      api_key?: string,
      photoset_id: string,
      user_id: NSID,
      extras?: string,
      per_page?: string,
      page?: string,
      privacy_filter?: string,
      media?: string,
    }): Request;
  }

  export class People {
    /**
     * Return a user's NSID, given their username.
     * @param api_key Your API application key. Optional if Flickr was constructed with a key.
     * @param username The username of the user to lookup.
     * @see https://www.flickr.com/services/api/flickr.people.findByUsername.html
     */
    findByUsername(arguments: {api_key?: string, username: string}): Request;
  }

  /** The response from the flickr service. */
  export type Request = any;  // ts-lint:disable-line: no-any

  /** The user's numerical flickr ID in the form #######@X##. (ex: 8036590@N05) */
  export type NSID = string;

  export class OAuth {
    /**
     * Returns an oauth plugin for this consumer key, consumer secret,
     * oauth token and oauth token secret,
     * @static
     * @param consumerKey The application's API key
     * @param consumerSecret The application's API secret
     * @param oauthToken The OAuth token
     * @param oauthTokenSecret The OAuth token secret
     * @returns An auth function to be used by the Flickr object.
     *
     * @example
     * const flickr = new Flickr(Flickr.OAuth.createPlugin(
     *   process.env.FLICKR_CONSUMER_KEY,
     *   process.env.FLICKR_CONSUMER_SECRET,
     *   process.env.FLICKR_OAUTH_TOKEN,
     *   process.env.FLICKR_OAUTH_TOKEN_SECRET
     * ));
     */
    static createPlugin(
        consumerKey: string, consumerSecret: string, oauthToken: string,
        oauthTokenSecret: string): Function;

    /**
     * Returns an oauth plugin for this consumer key and secret.
     * @param oauthToken - The OAuth token
     * @param oauthTokenSecret - The OAuth token secret
     * @returns An auth function to be used by the Flickr object.
     *
     * @example
     * const flickr = new Flickr(oauth.plugin(
     *   oauthToken,
     *   oauthTokenSecret
     * ));
     */
    plugin(oauthToken: string, oauthTokenSecret: string): Function;
  }
}
