import {NextFunction, Request, Response, Router} from 'express';

import {User} from '../../model/user';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';
import { ApprovalState } from '../../model/approval';
import { TagStore } from '../../store/tag.store';
import { Connection } from 'mongoose';
import { Tag } from '../../model/tag';
import { huskysoft } from '../../protos/protos';

export class ProfileRouterProvider extends RouterProvider {
  private _api: ProfileAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection) {
    super();
    this._api = new ProfileAPI(new TagStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachTagRoutes(router);
  }

  /*
   * GET / - Gets the current user's profile.
   */
  attachBaseRoutes(router: Router) {
    router.route('/')
        .get(Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetProfile(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /*
   * GET / - Gets the current user's tags.
   */
  attachTagRoutes(router: Router) {
    router.route('/tags')
        .get(Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetUserTags(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

class ProfileAPI {

  constructor(
    private _tagStore: TagStore,
  ) {}

  /**
   * Gets the current user's profile.
   */
  async handleGetProfile(req: Request, res: Response): Promise<void> {
    const user: User|undefined = req.user as User;
    if (!user) {
      res.sendStatus(403);
      return;
    }
    res.json(user.toProto());
  }

  /**
   * Gets the current user's tags.
   * @param req.body.state The state of tags to fetch. Do not include to get all tags.
   */
  async handleGetUserTags(req: Request, res: Response): Promise<void> {
    const user: User|undefined = req.user as User;
    if (!user) {
      res.sendStatus(403);
      return;
    }
    if (!req.body) {
      res.sendStatus(400);
      return;
    }
    const tags: Tag[] = await this._tagStore.findByValue(user);
    const state: ApprovalState = req.body.state;
    if (!state) {
      res.json(tags.map((tag: Tag) => tag.toProto()));
      return;
    }
    const apiTags: huskysoft.gotagme.Tag[] = tags.filter((tag: Tag) => {
      return tag.currentState === state;
    }).map((tag: Tag) => tag.toProto());
    res.json(apiTags);
  }
}
