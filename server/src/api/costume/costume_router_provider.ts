import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {Costume} from '../../model/costume';
import {Photo} from '../../model/photo';
import {User} from '../../model/user';
import {huskysoft} from '../../protos';
import {CostumeStore} from '../../store/costume.store';
import {TagStore} from '../../store/tag.store';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

export class CostumeRouterProvider extends RouterProvider {
  private _api: CostumeAPI;

  /**
   * @constructor
   * @param connection The mongoose connection to use database operations.
   */
  constructor(connection: Connection) {
    super();
    this._api = new CostumeAPI(
        new CostumeStore(connection), new UserStore(connection),
        new TagStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachPhotoRoutes(router);
  }

  /*
   * GET /:costumeID - Gets a costume by ID.
   */
  attachBaseRoutes(router: Router) {
    router.route('/:costumeID?')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetCostume(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handlePostCostume(req, res).catch(next))
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleDeleteCostume(req, res).catch(next));
  }

  /*
   * GET /:costumeID/photo - Gets the photos of a costume
   */
  attachPhotoRoutes(router: Router) {
    router.route('/:costumeID/photo')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetCostumePhotos(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handlePostCostume(req, res).catch(next))
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleDeleteCostume(req, res).catch(next));
  }
}

class CostumeAPI {
  private _costumeStore: CostumeStore;
  private _userStore: UserStore;
  private _tagStore: TagStore;

  constructor(
      costumeStore: CostumeStore, userStore: UserStore, tagStore: TagStore) {
    this._costumeStore = costumeStore;
    this._userStore = userStore;
    this._tagStore = tagStore;
  }

  /**
   * Gets a costume by ID.
   * @param req.params.costumeID The ID of the costume to fetch.
   */
  async handleGetCostume(req: Request, res: Response): Promise<void> {
    const id: string = req.params.costumeID;
    if (!id) {
      const costumes: Costume[] = await this._costumeStore.fetchAll();
      res.json(costumes.map((_) => _.toProto()));
      return;
    }
    const costume: Costume|null =
        await this._costumeStore.findOneByCostumeID(id);
    if (!costume) {
      res.sendStatus(404);
      return;
    }
    res.json(costume.toProto());
  }

  /**
   * Adds or updates a costume.
   * @param request.params.costumeID The costumeID if it is provided.
   * @param request.body An EditCostumeRequest.
   * @return The created Costume.
   */
  async handlePostCostume(req: Request, res: Response): Promise<void> {
    if (!req.body) {
      throw new Error('No request body parameters.');
    }
    const editRequest: huskysoft.gotagme.costume.EditCostumeRequest =
        huskysoft.gotagme.costume.EditCostumeRequest.fromObject(req.body);
    const existingID: string|undefined = req.params.costumeID;
    if (existingID) {
      const existing: Costume|null =
          await this._costumeStore.findOneByCostumeID(existingID);
      if (!existing) {
        res.sendStatus(404);
        return;
      }
      if (editRequest.name) {
        existing.addName(editRequest.name);
      }
      const owner: User|null =
          await this._userStore.findOneByUserID(editRequest.ownerID);
      if (owner) {
        existing.addOwner(owner);
      }
      await this._costumeStore.update(existing);
      res.sendStatus(200);
      return;
    }
    const addedByID: string = req.user && req.user.userID;
    const costume: Costume = await this._costumeStore.createWith(
        addedByID, editRequest.name, editRequest.ownerID);
    res.json(costume.toProto());
  }

  async handleDeleteCostume({}: Request, res: Response): Promise<void> {
    res.sendStatus(501);
  }

  /**
   * Gets the photos of a costume.
   * @param req
   * @param res
   */
  async handleGetCostumePhotos(req: Request, res: Response) {
    const costumeID: string = req.params.costumeID;
    if (!costumeID) {
      throw new ResponseError(400, 'No costume ID provided.');
    }
    const photos: Photo[]|null =
        await this._tagStore.photosForCostumeID(costumeID);
    res.json(photos && photos.map((_) => _.toProto()));
  }
}
