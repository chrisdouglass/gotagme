import {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {Account} from '../../model/account';
import {User} from '../../model/user';
import {huskysoft} from '../../protos';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';
import {TwitterFetcher} from '../twitter/twitter_fetcher';
import { SearchController } from '../../search/search-controller';
import { CostumeStore } from '../../store/costume.store';
import { UserStore } from '../../store/user.store';

export class SearchRouterProvider extends RouterProvider {
  private _searchAPI: SearchAPI;
  private _authHandler: RequestHandler;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(
      connection: Connection, authHandler?: RequestHandler,
      twitterFetcher?: TwitterFetcher) {
    super();
    this._searchAPI = new SearchAPI(new CostumeStore(connection), new UserStore(connection), twitterFetcher);
    this._authHandler = authHandler ? authHandler : Handlers.basicAuthenticate;
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
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) =>
                this._searchAPI.tagAutocomplete(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

export class SearchAPI {
  constructor(
    private costumeStore: CostumeStore,
    private userStore: UserStore,
    private twitterFetcher?: TwitterFetcher,
  ) {}

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
    // TODO: Real DI.
    const fetcher: TwitterFetcher = this.twitterFetcher ?
        this.twitterFetcher :
        new TwitterFetcher(account.oauthToken, account.oauthSecret);
    const text = req.params.term as string;
    const controller: SearchController = new SearchController(this.costumeStore, this.userStore, fetcher);
    const tags: huskysoft.gotagme.tag.Tag[] = await controller.autocomplete(text);
    res.status(200).json(new huskysoft.gotagme.tag.GetTagsResponse({
      tags,
    }));
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
