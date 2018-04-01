import {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {FlickrFetcher} from '../../flickr/flickr_fetcher';
import {ApprovalState} from '../../model/approval';
import {Costume} from '../../model/costume';
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
    this._tagAPI = new TagAPI(
        new CostumeStore(connection), tagStore, new UserStore(connection));
    this._authHandler = authHandler ? authHandler : Handlers.basicAuthenticate;
  }

  attachRoutes(router: Router) {
    this.attachCountRoutes(router);
    this.attachBaseIDRoutes(router);
    this.attachCostumeRoutes(router);
    this.attachUserRoutes(router);
  }

  attachBaseIDRoutes(router: Router) {
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
   * GET /user/:id - Gets tags of a user.
   */
  attachUserRoutes(router: Router) {
    router.route('/user/:id')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagsRequest =
              new huskysoft.gotagme.tag.GetTagsRequest({
                userID: req.params.id,
              });
          this._tagAPI.handleGetUserTags(request)
              .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                res.json(response.toJSON());
              })
              .catch(next);
        })
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /*
   * GET /costume/:id - Gets tags of a costume.
   */
  attachCostumeRoutes(router: Router) {
    router.route('/costume/:id')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagsRequest =
              new huskysoft.gotagme.tag.GetTagsRequest({
                costumeID: req.params.id,
              });
          this._tagAPI.handleGetCostumeTags(request)
              .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                res.json(response.toJSON());
              })
              .catch(next);
        })
        .put(Handlers.notImplemented)
        .post(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  attachCountRoutes(router: Router) {
    router.route('/counts/')
        .get(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .post((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagCountsRequest =
              huskysoft.gotagme.tag.GetTagCountsRequest.fromObject(req.body);
          this._tagAPI.handleGetTagCounts(request)
              .then((response: huskysoft.gotagme.tag.GetTagCountsResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .delete(Handlers.notImplemented);
  }
}

class TagAPI {
  constructor(
      private _costumeStore: CostumeStore,
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
   * Gets a user's tags.
   * @param req.body huskysoft.gotagme.tag.GetTagsRequest
   * @returns huskysoft.gotagme.tag.GetTagsResponse
   */
  async handleGetUserTags(request: huskysoft.gotagme.tag.GetTagsRequest):
      Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const user: User|null =
        await this._userStore.findOneByUserID(request.userID);
    if (!user) {
      throw new ResponseError(404);
    }
    return this.getTagsForValue(
        user, approvalStateFromProto(request.stateFilter));
  }

  /**
   * Gets a costume's tags.
   * @param req.body huskysoft.gotagme.tag.GetTagsRequest
   * @returns huskysoft.gotagme.tag.GetTagsResponse
   */
  async handleGetCostumeTags(request: huskysoft.gotagme.tag.GetTagsRequest):
      Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const costume: Costume|null =
        await this._costumeStore.findOneByCostumeID(request.costumeID);
    if (!costume) {
      throw new ResponseError(404);
    }
    return this.getTagsForValue(
        costume, approvalStateFromProto(request.stateFilter));
  }

  /**
   * Gets a hashtag's tags.
   * @param req.body huskysoft.gotagme.tag.GetTagsRequest
   * @returns huskysoft.gotagme.tag.GetTagsResponse
   */
  async handleGetHashtags(request: huskysoft.gotagme.tag.GetTagsRequest):
      Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    if (!request.hashtag) {
      throw new ResponseError(404);
    }
    return this.getTagsForValue(
        request.hashtag, approvalStateFromProto(request.stateFilter));
  }

  private async getTagsForValue(
      value: Costume|User|string,
      state?: ApprovalState): Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const wrappers: Tag[] = await this._tagStore.findByValue(value);
    let tags: huskysoft.gotagme.tag.Tag[] = [];
    if (!state) {
      tags = wrappers.map((tag: Tag) => tag.toProto());
    }
    tags = wrappers
               .filter((tag: Tag) => {
                 return tag.currentState === state;
               })
               .map((tag: Tag) => tag.toProto());
    return new huskysoft.gotagme.tag.GetTagsResponse({
      tags,
    });
  }

  async handleGetTagCounts(request: huskysoft.gotagme.tag.GetTagCountsRequest):
      Promise<huskysoft.gotagme.tag.GetTagCountsResponse> {
    const values = [];
    if (request.userIDs) {
      for (let i = 0; i < request.userIDs.length; i++) {
        const user: User|null =
            await this._userStore.findOneByUserID(request.userIDs[i]);
        if (user) {
          values.push(user);
        }
      }
    } else if (request.costumeIDs) {
      for (let i = 0; i < request.costumeIDs.length; i++) {
        const costume: Costume|null =
            await this._costumeStore.findOneByCostumeID(request.costumeIDs[i]);
        if (costume) {
          values.push(costume);
        }
      }
    } else if (request.hashtags) {
      for (let i = 0; i < request.hashtags.length; i++) {
        values.push(request.hashtags[i]);
      }
    }

    const responsePromises:
        Array<Promise<huskysoft.gotagme.tag.GetTagCountResponse>> =
            values.map(async (value: string|Costume|User) => {
              const tags: Tag[] = await this._tagStore.findByValue(value);
              return new huskysoft.gotagme.tag.GetTagCountResponse({
                count: tags.length,
                costume: value as Costume,
                user: value as User,
                hashtag: value as string,
              });
            });

    const responses: huskysoft.gotagme.tag.GetTagCountResponse[] =
        await Promise.all(responsePromises);

    return new huskysoft.gotagme.tag.GetTagCountsResponse({
      responses,
    });
  }
}
