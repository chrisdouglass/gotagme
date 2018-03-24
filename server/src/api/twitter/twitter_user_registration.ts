import {Connection} from 'mongoose';
import {parse as parseUrl} from 'url';
import {Url} from 'url';

import {User} from '../../model/user';
import {UserStore} from '../../store/user.store';

import {OAuthProvider, TokenResponse} from './twitter_oauth_provider';
import { TwitterFetcher } from './twitter_fetcher';
import { TwitterVerifyUserResponse } from '../../@types/twitter/twitter';
import { Account } from '../../model/account';

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
   * should be used in a redirect to the Twitter OAuth Url available from
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
      token: tokens.token,
      url: TwitterUserRegistration.getAuthUrl(tokens.token),
      query: tokens.query,
    } as TokenResponse;
  }

  /**
   * Registers a token/verifier pair and returns the registered user.
   * @param token The OAuth access token.
   * @param verifier The OAuth verifier from Twitter.
   */
  async registerToken(token: string, verifier: string): Promise<User|null> {
    const tokenResponse: TokenResponse =
        await this.fetchAccessTokens(token, verifier);
    if (!tokenResponse.token || !tokenResponse.secret) {
      return null;
    }

    const fetcher: TwitterFetcher = new TwitterFetcher(tokenResponse.token, tokenResponse.secret);
    const response: TwitterVerifyUserResponse = await fetcher.getUserInfo();
    const serverID: string = response.id_str;
    const existing: User|null = await this._userStore.findOneByServerID(serverID);
    if (existing) {
      const account: Account = existing.accounts!.find((account: Account) => account.serverID === serverID)!;
      account.document.oauthToken = tokenResponse.token;
      account.document.oauthSecret = tokenResponse.secret;
      return await existing.save() as User;
    }
    return this._userStore.createUserWithServerIDAndOAuthKeys(
        serverID, tokenResponse.token, tokenResponse.secret);
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
   * Gets the Url to redirect to for OAuth authentication.
   * @param requestToken - The request token (oauth_token).
   * @return The Url to redirect.
   */
  static getAuthUrl(requestToken: string): Url {
    return parseUrl(
        'https://api.twitter.com/oauth/authenticate?oauth_token=' +
        requestToken);
  }
}
