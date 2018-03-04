import {OAuth, ParsedQueryString} from 'oauth';
const oauth: OAuth = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.TWITTER_CONSUMER_KEY, process.env.TWITTER_CONSUMER_SECRET,
    '1.0A',
    process.env.TWITTER_DEV_CALLBACK,  // TODO: Support prod/dev.
    'HMAC-SHA1');

const requestTokenMap:
    {[index: string]: string} = {};  // TODO: Move to server session or DB.

/** A container for the tokens provided by the TwitterFetcher. */
export interface TokenResponse {
  token?: string;
  secret?: string;
  query?: ParsedQueryString;
}

/** Provides access to Twitter. */
export class TwitterFetcher {
  /**
   * Gets client request tokens for starting the OAuth process. This token
   * should be used in a redirect to the Twitter OAuth URL available from
   * getAuthUrl().
   * @returns The token response.
   */
  static async fetchRequestTokens(): Promise<TokenResponse> {
    return new Promise<TokenResponse>((resolve, reject) => {
      oauth.getOAuthRequestToken((err, token, secret, query) => {
        if (err) {
          return reject(err);
        }
        requestTokenMap[token] = secret;
        return resolve({
          token,
          query,
        });
      });
    });
  }

  /**
   * Gets access tokens from a request token and Twitter OAuth verifier. These
   * values are obtained from Twitter's OAuth response callback.
   * Access tokens are the keys to a user's twitter account.
   * @param token - The request token (oauth_token).
   * @param verifier - The oauth_verifier string.
   * @returns The authentication token response.
   */
  static fetchAccessTokens(token: string, verifier: string): Promise<TokenResponse> {
    const secret: string = requestTokenMap[token];
    if (!secret) {
      return Promise.reject(new Error('No cached request for token.'));
    }
    return this._fetchAccessTokens(token, requestTokenMap[token], verifier);
  }

  /**
   * Gets access tokens from a request token and Twitter OAuth verifier. These
   * values are obtained from Twitter's OAuth response callback.
   * Access tokens are the keys to a user's twitter account.
   * @param token - The request token (oauth_token).
   * @param secret - The request token secret.
   * @param verifier - The oauth_verifier string.
   * @returns The authentication token response.
   */
  static _fetchAccessTokens(token: string, secret: string, verifier: string):
      Promise<TokenResponse> {
    if (!token || !secret || !verifier) {
      return Promise.reject(new Error(
          'Invalid token state while trying to fetch access tokens.'));
    }
    return new Promise<TokenResponse>((resolve, reject) => {
      oauth.getOAuthAccessToken(
          token, secret, verifier,
          (error: Error, accessToken: string, accessTokenSecret: string,
           results: ParsedQueryString) => {
            if (error) {
              reject(error);
            } else {
              resolve({
                token: accessToken,
                secret: accessTokenSecret,
                query: results,
              });
            }
          });
    });
  }

  /**
   * Gets the URL to redirect to for OAuth authentication.
   * @param {string} requestToken - The request token (oauth_token).
   * @return {string} The URL to redirect.
   */
  static getAuthUrl(requestToken: string) {
    return 'https://api.twitter.com/oauth/authenticate?oauth_token=' +
        requestToken;
  }
}
