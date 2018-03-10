import {Connection} from 'mongoose';

import {JWT} from '../../common/types';
import {User} from '../../model/user/user';
import {UserStore} from '../../store/user.store';

import {OAuthProvider, TokenResponse} from './twitter_oauth_provider';

const requestTokenMap:
    {[index: string]: string} = {};  // TODO: Move to server session or DB.

/** Provides access to Twitter. */
export class TwitterUserRegistration {
  private _userStore: UserStore;
  private _provider: OAuthProvider;

  constructor(connection: Connection, provider: OAuthProvider) {
    this._userStore = new UserStore(connection);
    this._provider = provider;
  }

  /**
   * Gets client request tokens for starting the OAuth process. This token
   * should be used in a redirect to the Twitter OAuth URL available from
   * getAuthUrl().
   * @returns The token response.
   */
  async fetchRequestTokens(): Promise<TokenResponse> {
    const tokens: TokenResponse = await this._provider.fetchRequestTokens();
    if (!tokens.token || !tokens.secret) {
      throw new Error('Unable to obtain tokens from the OAuth provider.');
    }
    requestTokenMap[tokens.token] = tokens.secret;
    return {
      'token': tokens.token,
      'query': tokens.query,
    } as TokenResponse;
  }

  /**
   * Registers a token/verifier pair and returns a new JWT for the user.
   * @param token The OAuth access token.
   * @param verifier The OAuth verifier from Twitter.
   */
  async registerToken(token: string, verifier: string): Promise<JWT|undefined> {
    const tokenResponse: TokenResponse =
        await this.fetchAccessTokens(token, verifier);
    if (!tokenResponse.token || !tokenResponse.secret) {
      return undefined;
    }
    const user: User|null = await this._userStore.userForOAuthKeys(
        tokenResponse.token, tokenResponse.secret, true);
    if (!user) {
      throw new Error('Unable to register user.');
    }
    return user.createJWT();
  }

  /**
   * Gets access tokens from a request token and Twitter OAuth verifier. These
   * values are obtained from Twitter's OAuth response callback.
   * Access tokens are the keys to a user's twitter account.
   * @param token - The request token (oauth_token).
   * @param verifier - The oauth_verifier string.
   * @returns The authentication token response.
   */
  async fetchAccessTokens(token: string, verifier: string):
      Promise<TokenResponse> {
    const secret: string = requestTokenMap[token];
    if (!secret) {
      return Promise.reject(new Error('No cached request for token.'));
    }
    return this.fetchAccessTokensWithVerifier(
        token, requestTokenMap[token], verifier);
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
  private async fetchAccessTokensWithVerifier(
      token: string, secret: string, verifier: string): Promise<TokenResponse> {
    if (!token || !secret || !verifier) {
      throw new Error(
          'Invalid token state while trying to fetch access tokens.');
    }
    return this._provider.fetchAccessTokensWithVerifier(
        token, secret, verifier);
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