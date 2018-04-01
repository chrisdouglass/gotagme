import {TwitterUsersSearchResponse, TwitterVerifyUserResponse} from '../../@types/twitter/twitter';

export type TwitterAPI = any;  // tslint:disable-line: no-any
// tslint:disable-next-line: variable-name
const Twitter: TwitterAPI = require('twitter');

export interface Fetcher { getUserInfo(): Promise<TwitterVerifyUserResponse>; }

export class TwitterFetcher implements Fetcher {
  private twitter: any;  // tslint:disable-line: no-any

  // TODO: Real DI.
  constructor(oauthKey: string, oauthSecret: string, twitter?: TwitterAPI) {
    this.twitter = twitter ? twitter : new Twitter({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,

      access_token_key: oauthKey,
      access_token_secret: oauthSecret,

      bearer_token: (!oauthKey || !oauthSecret) ? '' : undefined,
    });
  }

  async searchForUsers(text: string): Promise<TwitterUsersSearchResponse[]> {
    return this.twitter.get('users/search', {
      q: text,
      count: 20,
    }) as TwitterUsersSearchResponse[];
  }

  async getUserInfo(): Promise<TwitterVerifyUserResponse> {
    return this.twitter.get('account/verify_credentials', {
      skip_status: true,
    }) as TwitterVerifyUserResponse;
  }
}
