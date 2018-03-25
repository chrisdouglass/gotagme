import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {TwitterUsersSearchResponse} from '../../@types/twitter/twitter';
import {Account} from '../../model/account';
import {User} from '../../model/user';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';
import {TwitterFetcher} from '../twitter/twitter_fetcher';
import { huskysoft } from '../../protos/protos';

export class SearchRouterProvider extends RouterProvider {
  private _searchAPI: SearchAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor({}: Connection) {
    super();
    this._searchAPI = new SearchAPI();
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachAutocompleteRoutes(router);
  }

  attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  attachAutocompleteRoutes(router: Router) {
    router.route('/tag/:term?')
        .get(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._searchAPI.tagAutocomplete(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

export class SearchAPI {
  constructor() {}

  /**
   * GET API for retrieving all Photos.
   */
  async tagAutocomplete(req: Request, res: Response): Promise<void> {
    const user: User = req.user as User;
    if (!user) {
      res.sendStatus(403);
      return;
    }
    const account: Account|undefined =
        user.accounts ? user.accounts[0] : undefined;
    if (!account) {
      res.sendStatus(403);
      return;
    }
    const fetcher: TwitterFetcher =
        new TwitterFetcher(account.oauthToken, account.oauthSecret);
    const text = req.params.term as string;
    const apiResults: TwitterUsersSearchResponse[] =
        await fetcher.searchForUsers(text);
    const results = apiResults.map((response: TwitterUsersSearchResponse) => {
      return new huskysoft.gotagme.Tag({
        key: response.id_str,
        tag: '@' + response.screen_name,
        display: response.name,
      });
    });
    res.status(200).json(results);
  }
}

export enum SearchType {
  // Also perform a search on Twitter for users.
  Extended = 'extended',
}

export enum TagAutocompleteResultType {
  Costume = 'costume',
  User = 'user',
  Hashtag = 'hashtag',
}

export interface TagAutocompleteResult {
  text: string;
  type: TagAutocompleteResultType;
  displayName: string;
  twitterScreenName: string;
  twitterProfileImageUrl: string;
}
