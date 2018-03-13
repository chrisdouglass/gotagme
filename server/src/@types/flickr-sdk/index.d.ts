declare module 'flickr-sdk' {
  /**
   * The Flickr REST API client.
   * @example <caption>Get info about a public photo with your API key</caption>
   *
   * var flickr = new Flickr(process.env.FLICKR_API_KEY);
   *
   * flickr.photos.getInfo({
   *   photo_id: 25825763 // sorry, @dokas
   * }).then(function (res) {
   *   console.log('yay!', res.body);
   * }).catch(function (err) {
   *   console.error('bonk', err);
   * });
   *
   * @example <caption>Searching for public photos with your API key</caption>
   *
   * var flickr = new Flickr(process.env.FLICKR_API_KEY);
   *
   * flickr.photos.search({
   *   text: 'doggo'
   * }).then(function (res) {
   *   console.log('yay!', res.body);
   * }).catch(function (err) {
   *   console.error('bonk', err);
   * });
   *
   * @example <caption>Authenticate as a user with the OAuth plugin</caption>
   *
   * var flickr = new Flickr(Flickr.OAuth.createPlugin(
   *   process.env.FLICKR_CONSUMER_KEY,
   *   process.env.FLICKR_CONSUMER_SECRET,
   *   process.env.FLICKR_OAUTH_TOKEN,
   *   process.env.FLICKR_OAUTH_TOKEN_SECRET
   * ));
   *
   * flickr.test.login().then(function (res) {
   *   console.log('yay!', res.body);
   * }).catch(function (err) {
   *   console.error('bonk', err);
   * });
   */
  class Flickr {
    /**
     * Creates a new Flickr REST API client.
     *
     * You **must** pass a superagent plugin or your API key as the first
     * parameter. For methods that don't require authentication, you can simply
     * provide your API key. For methods that do require authentication,
     * use Flickr.OAuth.createPlugin.
     * @param authenticationPlugin An authentication plugin. {@link Flickr.OAuth.createPlugin}
     * @param apiKey The application's API key for unauthenticated requests only.
     */
    constructor(authenticationPlugin: Function);
    constructor(apiKey: string);

    people: Flickr.People;
    photos: Flickr.Photos;
    photosets: Flickr.Photosets;

    OAuth: Flickr.OAuth;
  }

  namespace Flickr {
    export interface Photos {
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
      }): Request<Photo>;
    }

    export interface Photo {
      id?: NumberAsString;
      secret?: string;
      server?: NumberAsString;
      farm?: number;
      isfavorite?: Boolean;
      license?: number;
      rotation?: number;
      originalsecret?: string;  // Gives access to the original image.
      originalformat?: string;
      media?: MediaType;
      owner?: {
        nsid?: NSID,
        username?: string,
        realname?: string,
        location?: string,
        path_alias?: string,
      };
      title?: {
        _content: string;
      };
      description?: {
        _content: string;
      };
      dateuploaded?: TimestampAsString;
      visibility?: {
        isPublic?: Boolean,
        isFriend?: Boolean,
        isFamily?: Boolean,
      };
      dates?: {
        posted?: TimestampAsString,
        taken?: LocalizedDateString,
        takengranularity?: TakenGranularity,
        lastupdate?: TimestampAsString,
      };
      permissions?: {
        permcomment?: number,
        permaddmeta?: number,
      };
      editability?: {
        cancomment?: number,
        canaddmeta?: number,
      };
      comments?: {
        _content: number;  // The comment count.
      };
      notes?: {
        note: {
          id: string,
          author: string,
          authorname?: string,
          x?: string, y?: string, w?: string, h?: string,
          _content?: string,
        }[],
      };
      tags: {
        tag: PhotoTag[],
      };
      location?: {
        latitude: number,
        longitude: number,
        accuracy: number,
        context: number,
        county: {
          _content: string,
          place_id: string,
          woeid: NumberAsString,
        },
        region: {
          _content: string,
          place_id: string,
          woeid: NumberAsString,
        },
        country: {
          _content: string,
          place_id: string,
          woeid: NumberAsString,
        },
        place_id: string,
        woeid: NumberAsString,
      };
      urls: {
        url: {
          type: string,
          _content: string,
        }[],
      };
    }

    export interface PhotoTag {
      id: string;
      author: NSID;
      authorname?: string;
      raw: string;
      _content: string;
      machine_tag: string|number;
    }

    export interface Photosets {
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
      }): Request<Photoset>;
    }

    export interface Photoset {
      id: NumberAsString;
      primary: NumberAsString;
      owner: NSID,
      ownername: string,
      photo: [
        {
          id: NumberAsString,
          secret: string,
          server: NumberAsString,
          farm: number,
          title: string,
          isprimary: Boolean,
          ispublic: Boolean,
          isfriend: Boolean,
          isfamily: Boolean
        }
      ],
      page: number,
      per_page: NumberAsString,
      perpage: NumberAsString,
      pages: number;
      title: string;
      total: number;
    }

    export interface People {
      /**
       * Return a user's NSID, given their username.
       * @param api_key Your API application key. Optional if Flickr was constructed with a key.
       * @param username The username of the user to lookup.
       * @see https://www.flickr.com/services/api/flickr.people.findByUsername.html
       */
      findByUsername(arguments: {api_key?: string, username: string}): Request<User>;
    }

    export interface User {
      id: NSID;
    }

    /** The response from the flickr service. */
    export interface Request<T> {
      body: any;
    }

    /** The user's numerical flickr ID in the form #######@X##. (ex: 8036590@N05) */
    export type NSID = string;

    export class OAuth {
      /**
       * Creates a new OAuth service instance. You can use this service to
       * request and validate OAuth tokens, as well as generate an auth
       * plugin suitable for use with the REST and Upload services.
       *
       * You need to [register an application](https://www.flickr.com/services/apps/create/)
       * to obtain your `consumerKey` and `consumerSecret`.
       *
       * > **OAuth 1.0 requires your consumer secret to sign calls,
       * > and you should never expose secrets to the browser.**
       *
       * @constructor
       * @param consumerKey - The application's API key
       * @param consumerSecret - The application's API secret
       * @memberof Flickr
       *
       * @example
       *
       * var oauth = new Flickr.OAuth(
       *   process.env.FLICKR_CONSUMER_KEY,
       *   process.env.FLICKR_CONSUMER_SECRET
       * );
       */
      constructor(consumerKey: string, consumerSecret: string);

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

    /** Convenience types not found in the library. Used for annotation. */
    export enum MediaType {
      // Potentially incomplete.
      Photo = 'photo',
    }

    /** The granularity/accuracy of the photo's taken date. */
    export enum TakenGranularity {
      ExactDate = 0,
      MonthAndYear = 4,
      YearOnly = 6,
    }

    export enum Boolean {
      False = 0,
      True = 1,
    }
    export type LocalizedDateString = string;
    export type NumberAsString = string;
    export type TimestampAsString = string;
    export enum TrueFalseString {
      False = '0',
      True = '1',
    }

    export enum URLType {
      // Potentially incomplete.
      Photopage = 'photopage',
    }
  }

  export = Flickr;
}
