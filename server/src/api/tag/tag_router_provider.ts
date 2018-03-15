import {Router} from 'express';
import {Connection} from 'mongoose';

import {TagStore} from '../../store/tag.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class TagRouterProvider extends RouterProvider {
  private _api: TagAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection) {
    super();
    this._api = new TagAPI(new TagStore(connection));
    console.log(this._api);
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);

    // Make every other request a 403.
    router.use('/', Handlers.notAllowed);
  }

  attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

class TagAPI {
  private _tagStore: TagStore;
  constructor(tagStore: TagStore) {
    this._tagStore = tagStore;
    console.log(this._tagStore);
  }
}
