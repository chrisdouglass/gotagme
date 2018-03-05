import {OAuth, ParsedQueryString} from 'oauth';

/** A container for the tokens provided by OAuth. */
export interface TokenResponse {
  token: string;
  secret?: string;
  query?: ParsedQueryString;
}

/** Interface for providers of OAuth tokens. */
export interface OAuthProvider {
  fetchRequestTokens(): Promise<TokenResponse>;
  fetchAccessTokensWithVerifier(
      token: string, secret: string, verifier: string): Promise<TokenResponse>;
}

/** Provides OAuth tokens for Twitter. */
export class TwitterOAuthProvider implements OAuthProvider {
  private _oauth: OAuth;

  constructor() {
    this._oauth = new OAuth(
        'https://api.twitter.com/oauth/request_token',
        'https://api.twitter.com/oauth/access_token',
        process.env.TWITTER_CONSUMER_KEY, process.env.TWITTER_CONSUMER_SECRET,
        '1.0A',
        process.env.TWITTER_DEV_CALLBACK,  // TODO: Support prod/dev.
        'HMAC-SHA1');
  }

  /**
   * Gets a set of request tokens for authenticating with Twitter.
   * @returns The token response from Twitter's OAuth.
   */
  async fetchRequestTokens(): Promise<TokenResponse> {
    return new Promise<TokenResponse>((resolve, reject) => {
      this._oauth.getOAuthRequestToken(
          (err: Error, token: string, secret: string,
           query: ParsedQueryString) => {
            if (err) {
              return reject(err);
            }
            return resolve({
              token,
              secret,
              query,
            } as TokenResponse);
          });
    });
  }

  /**
   * Authenticates with Twitter using the provided keys and returns an
   * authentication keys response.
   * @param token The Twitter request token.
   * @param secret The Twitter request seceet.
   * @param verifier Twitter's OAuth response verifier.
   * @returns A response with the authenticated OAuth keys for the user's
   * Twitter account.
   */
  async fetchAccessTokensWithVerifier(
      token: string, secret: string, verifier: string): Promise<TokenResponse> {
    return new Promise<TokenResponse>((resolve, reject) => {
      this._oauth.getOAuthAccessToken(
          token, secret, verifier,
          (error: Error, accessToken: string, accessTokenSecret: string,
           results: ParsedQueryString) => {
            if (error) {
              return reject(error);
            } else {
              return resolve({
                token: accessToken,
                secret: accessTokenSecret,
                query: results,
              } as TokenResponse);
            }
          });
    });
  }
}
