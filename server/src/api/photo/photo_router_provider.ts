import {NextFunction, Request, Response, Router} from 'express';
import {Connection} from 'mongoose';
import {parse as parseUrl} from 'url';

import {ResponseError} from '../../common/types';
import {ApprovalState} from '../../model/base/approval';
import {Costume} from '../../model/costume';
import {Photo} from '../../model/photo';
import {Tag} from '../../model/tag';
import {User} from '../../model/user';
import {CostumeStore} from '../../store/costume.store';
import {PhotoStore} from '../../store/photo.store';
import {TagStore} from '../../store/tag.store';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

/** Creates a router configured with the Photo API endpoints. */
export class PhotoRouterProvider extends RouterProvider {
  private _photoAPI: PhotoAPI;

  constructor(connection: Connection) {
    super();
    this._photoAPI = new PhotoAPI(
        new PhotoStore(connection), new TagStore(connection),
        new CostumeStore(connection), new UserStore(connection));
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachIDRoutes(router);

    // Make every other request a 403.
    router.use('/', Handlers.notAllowed);
  }

  /**
   * Base routes.
   * POST / - Inserts a photo by the flickrUrl parameter. REQUIRES
   * AUTHENTICATION.
   * @param router The router for adding routes.
   */
  private attachBaseRoutes(router: Router) {
    router.route('/')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.getAllPhotos(req, res).catch(next))
        .post(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.postPhoto(req, res).catch(next))
        .put(Handlers.notImplemented)
        .delete(Handlers.notImplemented);
  }

  /**
   * Photo by ID routes.
   * GET /:id - Fetches an existing photo by id.
   * PUT /:id - Inserts or updates a photo by id. REQUIRES AUTHENTICATION.
   * DELETE /:id - Rejects a photo.
   *
   * GET /:id/tag/:tagID? - Fetches the details of a tag or all tags on a photo
   * if tagID is undefined.
   * POST /:id/tag/:tagID? - Updates a tag if an id is given or posts a new tag
   * if undefined.
   * DELETE /:id/tag/:tagID - Rejects a tag.
   * @param router The router for adding routes.
   */
  private attachIDRoutes(router: Router) {
    router.route('/:id')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.getPhoto(req, res).catch(next))
        .post(Handlers.notImplemented)
        .put(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.putPhoto(req, res).catch(next))
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.deletePhoto(req, res).catch(next));

    router.route('/:id/tag/:tagID?')
        .get(
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handleGetTagByID(req, res).catch(next))
        .post(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handlePostTag(req, res).catch(next))
        .put(Handlers.notImplemented)
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handleRejectTag(req, res).catch(next));
  }
}

/**
 * Photo API handler.
 */
export class PhotoAPI {
  private _store: PhotoStore;
  private _tagStore: TagStore;
  private _costumeStore: CostumeStore;
  private _userStore: UserStore;

  constructor(
      store: PhotoStore, tagStore: TagStore, costumeStore: CostumeStore,
      userStore: UserStore) {
    this._store = store;
    this._tagStore = tagStore;
    this._costumeStore = costumeStore;
    this._userStore = userStore;
  }

  /**
   * GET API for retrieving all Photos.
   */
  async getAllPhotos({}: Request, res: Response): Promise<void> {
    res.json(await this._store.fetchAll());
  }

  /**
   * GET API for retrieving a Photo.
   */
  async getPhoto(req: Request, res: Response): Promise<void> {
    const photoID: string|undefined = req.params.id;
    if (!photoID) {
      res.status(400).json(new ResponseError(400, 'No ID given.'));
      return;
    }
    const photo: Photo|null = await this._store.findByPhotoID(photoID);
    if (!photo) {
      res.sendStatus(404);
      return;
    }
    res.json(photo);
  }

  /**
   * PUT API for updating an existing Photo.
   */
  async putPhoto({}: Request, {}: Response): Promise<void> {
    throw new ResponseError(501);
  }

  /**
   * POST API for creating or updating a new Photo.
   */
  async postPhoto(req: Request, res: Response): Promise<void> {
    const flickrUrlString: string|undefined =
        !req.fields ? undefined : req.fields.flickrUrl as string;
    if (!flickrUrlString) {
      res.status(400).json(new Error('No flickr Url provided.'));
      return;
    }
    const user: User|undefined = req.user as User;
    if (!user) {
      res.status(403).json(new Error('Not logged in.'));
      return;
    }
    const photo: Photo = await this._store.createFromFlickrUrlPostedByUser(
        parseUrl(flickrUrlString), user);
    res.status(201).json(photo);
  }

  /**
   * DELETE API for removing a Photo.
   */
  async deletePhoto(req: Request, res: Response): Promise<void> {
    const photoID: string|undefined = req.params.id;
    if (!photoID) {
      res.status(400).json(new Error('No ID given.'));
      return;
    }
    const photo: Photo|null = await this._store.findByPhotoID(photoID);
    if (!photo) {
      res.sendStatus(404);
      return;
    }
    await this._store.delete(photo);
    res.send(200);
  }

  /**
   * Method to get a tag's information by it's ID. Only use one of the two
   * parameters.
   * @param req.params.tagID The tagID to get.
   * @param req.params.photoID The photoID for getting all tags.
   */
  async handleGetTag(req: Request, res: Response): Promise<void> {
    if (req.params.tagID) {
      return this.handleGetTagByID(req, res);
    }
    const photoID: string = req.params.id;
    const photo: Photo|null = await this._store.findByPhotoID(photoID);
    if (!photo) {
      res.sendStatus(404);
      return;
    }
    res.json(await this._tagStore.findByPhoto(photo));
  }

  /**
   * Method to get a tag's information by it's ID.
   * @param req.params.tagID The tagID to get.
   */
  async handleGetTagByID(req: Request, res: Response): Promise<void> {
    const tagID: string = req.params.tagID;
    if (tagID) {
      res.json(await this._tagStore.findOneByTagID(tagID));
      return;
    }
    res.json(await this._tagStore.fetchAll());
  }

  /**
   * Adds or updates a tag.
   * @param request.params.tagID The tagID if it is provided.
   * @param request.fields Tag data from body key-values:
   *   // The new status of a tag. Update only.
   *   state: 'accepted' || 'rejected',
   *   // The userID of who is adding the tag. Create only.
   *   addedBy: userID,
   *   // One of the following three fields. Create only.
   *     costumeID: costumeID, // The costume to tag,
   *     userID: userID, // The user to tag,
   *     string: string, // The string to tag,
   * @return The created tag: {
   *   tagID: string,
   *   costume?: {
   *     costumeID: string,
   *     name?: string,
   *     owner?: {
   *       userID: string,
   *       displayName?: string,
   *     },
   *   },
   *   user?: {
   *     userID: string,
   *     displayName?: string,
   *   },
   *   string?: string,
   * }
   */
  async handlePostTag(req: Request, res: Response): Promise<void> {
    if (!req.fields) {
      throw new Error('No request body parameters.');
    }
    const photo: Photo|null = await this._store.findByPhotoID(req.params.id);
    if (!photo) {
      throw new Error('No photo found for ID' + req.params.id);
    }

    const existingID = req.params.tagID;
    const existing: Tag|null = await this._tagStore.findOneByTagID(existingID);
    if (existing) {
      if (!req.fields.state) {
        throw new Error(
            'No status provided for updating existing tagID ' + existing.tagID);
      }
      const state: ApprovalState = req.fields.state as ApprovalState;
      if (state !== ApprovalState.Approved &&
          state !== ApprovalState.Rejected) {
        throw new Error(
            'Illegal status for updating existing tag: ' + existing.tagID);
      }
      await this._tagStore.setTagApprovalState(
          existing, state, req.user as User);
      res.sendStatus(200);
      return;
    }

    let value: Costume|User|string|null = null;
    if (req.fields.costumeID) {
      value = await this._costumeStore.findOneByCostumeID(
          req.fields.costumeID as string);
    } else if (req.fields.userID) {
      value =
          await this._userStore.findOneByUserID(req.fields.userID as string);
    } else if (req.fields.string) {
      value = req.fields.string as string;
    }
    if (!value) {
      throw new Error('No value provided.');
    }
    const tag: Tag =
        await this._tagStore.addTagValueToPhoto(value, photo, req.user as User);
    if (!tag) {
      throw new Error('Failed to create new tag.');
    }
    res.json(tag);
  }

  /**
   * Rejects a tag.
   * @param request.params.tagID The tagID to reject.
   */
  async handleRejectTag(req: Request, res: Response): Promise<void> {
    const tagID = req.params.tagID;
    if (!tagID) {
      throw new Error('No tag ID provided.');
    }
    await this._tagStore.setTagApprovalStateByID(
        tagID, ApprovalState.Rejected, req.user! as User);
    res.send(200);
  }
}
