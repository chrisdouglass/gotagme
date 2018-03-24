import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {ResponseError} from '../../common/types';
import {Costume} from '../../model/costume';
import {User} from '../../model/user';
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
      res.json(await this._costumeStore.fetchAll());
      return;
    }
    const costume: Costume|null =
        await this._costumeStore.findOneByCostumeID(id);
    if (!costume) {
      res.sendStatus(404);
      return;
    }
    res.json(costume);
  }

  /**
   * Adds or updates a costume.
   * @param request.params.costumeID The costumeID if it is provided.
   * @param request.fields Costume data from body key-values:
   *   name?: string,
   *   ownerID?: string,
   *   addedBy: userID,  // Only if costumeID is not provided.
   * @return The created costume: {
   *   costumeID: string,
   *   name?: string,
   *   owner?: User,
   * }
   */
  async handlePostCostume(req: Request, res: Response): Promise<void> {
    if (!req.fields) {
      throw new Error('No request body parameters.');
    }
    const newName = req.fields.name as string;
    const newOwnerID = req.fields.ownerID as string;
    const existingID: string|undefined = req.params.costumeID;
    if (existingID) {
      const existing: Costume|null =
          await this._costumeStore.findOneByCostumeID(existingID);
      if (!existing) {
        res.sendStatus(404);
        return;
      }
      if (newName) {
        existing.addName(newName);
      }
      const owner: User|null =
          await this._userStore.findOneByUserID(newOwnerID);
      if (owner) {
        existing.addOwner(owner);
      }
      await this._costumeStore.update(existing);
      res.sendStatus(200);
      return;
    }
    const addedByID: string = req.fields.addedBy as string;
    const costume: Costume =
        await this._costumeStore.createWith(addedByID, newName, newOwnerID);
    res.json(costume);
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
    res.json(await this._tagStore.photosForCostumeID(costumeID));
  }
}
