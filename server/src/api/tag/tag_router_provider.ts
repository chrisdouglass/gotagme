import {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {FlickrFetcher} from '../../flickr/flickr_fetcher';
import {ApprovalState} from '../../model/approval';
import {Tag} from '../../model/tag';
import {User} from '../../model/user';
import {huskysoft} from '../../protos';
import {approvalStateFromProto} from '../../protos/conversion';
import {ApprovalStore} from '../../store/approval.store';
import {CostumeStore} from '../../store/costume.store';
import {FlickrPhotoStore} from '../../store/flickr_photo.store';
import {PhotoStore} from '../../store/photo.store';
import {TagStore} from '../../store/tag.store';
import {UserStore} from '../../store/user.store';
import {PhotoAPI} from '../photo/photo_router_provider';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class TagRouterProvider extends RouterProvider {
  private _tagAPI: TagAPI;
  private _photoAPI: PhotoAPI;
  private _authHandler: RequestHandler;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection, authHandler?: RequestHandler) {
    super();
    const tagStore: TagStore = new TagStore(connection);
    this._photoAPI = new PhotoAPI(
        new PhotoStore(connection), tagStore, new CostumeStore(connection),
        new UserStore(connection), new ApprovalStore(connection),
        FlickrFetcher.default(), new FlickrPhotoStore(connection));
    this._tagAPI = new TagAPI(tagStore, new UserStore(connection));
    this._authHandler = authHandler ? authHandler : Handlers.basicAuthenticate;
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachTagRoutes(router);
  }

  attachBaseRoutes(router: Router) {
    router.route('/:id?')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagsRequest =
              new huskysoft.gotagme.tag.GetTagsRequest({
                tagID: req.params.id,
                // photoID: req.params.id,
              });
          this._photoAPI.handleGetTag(request)
              .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .put(Handlers.notImplemented)
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              this._photoAPI
                  .handleModifyTag(
                      req.params.id,
                      huskysoft.gotagme.tag.ModifyTagRequest.fromObject(
                          req.body),
                      req.user as User)
                  .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                    res.json(response);
                  })
                  .catch(next);
            })
        .delete(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              this._photoAPI
                  .handleRejectTag(
                      new huskysoft.gotagme.tag.RejectTagRequest({
                        id: req.params.id,
                      }),
                      req.user as User)
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch(next);
            });
  }

  /*
   * GET / - Gets tags of a user.
   */
  attachTagRoutes(router: Router) {
    router.route('/user/:id')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagsRequest =
              new huskysoft.gotagme.tag.GetTagsRequest({
                userID: req.params.id,
              });
          this._tagAPI.handleGetUserTags(request)
              .then((tags: huskysoft.gotagme.tag.Tag[]) => {
                res.json(new huskysoft.gotagme.tag.GetTagsResponse({tags}));
              })
              .catch(next);
        })
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }
}

class TagAPI {
  constructor(
      private _tagStore: TagStore,
      private _userStore: UserStore,
  ) {}

  /**
   * Gets the current user's profile.
   */
  async handleGetProfile(req: Request):
      Promise<huskysoft.gotagme.user.GetUserReponse> {
    const user: User|undefined = req.user as User;
    if (!user) {
      throw new ResponseError(403);
    }
    return new huskysoft.gotagme.user.GetUserReponse({
      user,
    });
  }

  /**
   * Gets the current user's tags.
   * @param req.body.state The state of tags to fetch. Do not include to get all
   * tags.
   */
  async handleGetUserTags(request: huskysoft.gotagme.tag.GetTagsRequest):
      Promise<huskysoft.gotagme.tag.Tag[]> {
    const user: User|null =
        await this._userStore.findOneByUserID(request.userID);
    if (!user) {
      throw new ResponseError(404);
    }
    const tags: Tag[] = await this._tagStore.findByValue(user);
    const state: ApprovalState = approvalStateFromProto(request.stateFilter);
    if (!state) {
      return tags.map((tag: Tag) => tag.toProto());
    }
    return tags
        .filter((tag: Tag) => {
          return tag.currentState === state;
        })
        .map((tag: Tag) => tag.toProto());
  }
}
