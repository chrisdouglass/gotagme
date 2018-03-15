import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';

import {Costume} from '../../model/costume';
import {User} from '../../model/user';
import {CostumeStore} from '../../store/costume.store';
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
    this._api =
        new CostumeAPI(new CostumeStore(connection), new UserStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);

    // Make every other request a 403.
    router.use('/', Handlers.notAllowed);
  }

  /*
   * GET /:costumeID - Gets a costume by ID.
   */
  attachBaseRoutes(router: Router) {
    router.route('/:costumeID')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleGetCostume(req, res).catch(next))
        .put(Handlers.notImplemented)
        .post(
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handlePostCostume(req, res).catch(next))
        .delete(
            (req: Request, res: Response, next: NextFunction) =>
                this._api.handleDeleteCostume(req, res).catch(next));
  }
}

class CostumeAPI {
  private _costumeStore: CostumeStore;
  private _userStore: UserStore;

  constructor(costumeStore: CostumeStore, userStore: UserStore) {
    this._costumeStore = costumeStore;
    this._userStore = userStore;
  }

  /**
   * Gets a costume by ID.
   * @param req.params.costumeID The ID of the costume to fetch.
   */
  async handleGetCostume(req: Request, res: Response) {
    const costume: Costume|null =
        await this._costumeStore.findOneByCostumeID(req.params.costumeID);
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
      return this._costumeStore.update(existing);
    }
    const addedByID: string = req.fields.addedBy as string;
    this._costumeStore.createWith(addedByID, newName, newOwnerID);
  }

  async handleDeleteCostume({}: Request, {}: Response) {}
}
