import {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection, PaginateOptions, PaginateResult} from 'mongoose';
import {parse as parseUrl, Url} from 'url';

import {ResponseError} from '../../common/types';
import {FlickrFetcher} from '../../flickr/flickr_fetcher';
import {ApprovalState} from '../../model/approval';
import {Costume} from '../../model/costume';
import {FlickrPhoto, Photo} from '../../model/photo';
import {Tag} from '../../model/tag';
import {User} from '../../model/user';
import {huskysoft} from '../../protos';
import {ApprovalStore} from '../../store/approval.store';
import {CostumeStore} from '../../store/costume.store';
import {FlickrPhotoStore} from '../../store/flickr_photo.store';
import {PhotoStore} from '../../store/photo.store';
import {TagStore} from '../../store/tag.store';
import {UserStore} from '../../store/user.store';
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';
import { approvalStateFromProto } from '../../protos/conversion';

/** Creates a router configured with the Photo API endpoints. */
export class PhotoRouterProvider extends RouterProvider {
  private _photoAPI: PhotoAPI;
  private _authHandler: RequestHandler;

  constructor(
      connection: Connection, authHandler?: RequestHandler,
      flickrFlickr?: FlickrFetcher) {
    super();
    this._photoAPI = new PhotoAPI(
        new PhotoStore(connection), new TagStore(connection),
        new CostumeStore(connection), new UserStore(connection),
        new ApprovalStore(connection),
        flickrFlickr ? flickrFlickr : FlickrFetcher.default(),
        new FlickrPhotoStore(connection));
    this._authHandler = authHandler ? authHandler : Handlers.basicAuthenticate;
  }

  attachRoutes(router: Router) {
    this.attachBaseRoutes(router);
    this.attachIDRoutes(router);
  }

  /**
   * Base routes.
   * POST / - Inserts by the flickrUrl parameter. Provide an array of
   * Urls as strings to insert. REQUIRES AUTHENTICATION.
   * @param router The router for adding routes.
   */
  private attachBaseRoutes(router: Router) {
    router.route('/')
        .get(
          ({}: Request, res: Response, next: NextFunction) => {
            const request: huskysoft.gotagme.GetPhotoRequest = new huskysoft.gotagme.GetPhotoRequest({
              page: 1,
            });
            this._photoAPI.handleGetPhoto(request, res).catch(next);
          })
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.postPhotos(req, res).catch(next))
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
            (req: Request, res: Response, next: NextFunction) => {
              const request: huskysoft.gotagme.GetPhotoRequest = new huskysoft.gotagme.GetPhotoRequest({
                id: req.params.id,
              });
              this._photoAPI.handleGetPhoto(request, res).catch(next);
            })
        .post(Handlers.notImplemented)
        .put(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.putPhoto(req, res).catch(next))
        .delete(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.deletePhoto(req, res).catch(next));

    router.route('/:id/tag/:tagID?')
        .get(
            (req: Request, res: Response, next: NextFunction) => {
              const request: huskysoft.gotagme.GetTagsRequest = new huskysoft.gotagme.GetTagsRequest({
                tagID: req.params.tagID,
                photoID: req.params.id,
              });
              this._photoAPI.handleGetTag(request, res).catch(next)
            })
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handlePostTag(req, res).catch(next))
        .put(Handlers.notImplemented)
        .delete(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) =>
                this._photoAPI.handleRejectTag(req, res).catch(next));
  }
}

/**
 * Photo API handler.
 */
export class PhotoAPI {
  private _photoStore: PhotoStore;
  private _tagStore: TagStore;
  private _costumeStore: CostumeStore;
  private _userStore: UserStore;
  private _statusStore: ApprovalStore;
  private _fetcher: FlickrFetcher;
  private _flickrStore: FlickrPhotoStore;

  constructor(
      photoStore: PhotoStore, tagStore: TagStore, costumeStore: CostumeStore,
      userStore: UserStore, statusStore: ApprovalStore,
      flickrFetcher: FlickrFetcher, flickrPhotoStore: FlickrPhotoStore) {
    this._photoStore = photoStore;
    this._tagStore = tagStore;
    this._costumeStore = costumeStore;
    this._userStore = userStore;
    this._statusStore = statusStore;

    this._fetcher = flickrFetcher;
    this._flickrStore = flickrPhotoStore;
  }

  /**
   * GET API for retrieving Photos.
   */
  async handleGetPhoto(request: huskysoft.gotagme.GetPhotoRequest, res: Response): Promise<huskysoft.gotagme.GetPhotoResponse|null> {
    let photos: huskysoft.gotagme.Photo[] = [];
    if (request.id) {
      const photo: Photo|null = await this._photoStore.findByPhotoID(request.id);
      if (!photo) {
        res.sendStatus(404);
        return null;
      }
      photos = [photo.toProto()];
    } else {
      const result: PaginateResult<Photo> = await this._photoStore.paginate({}, {
        page: request.page,
      } as PaginateOptions);
      photos = result.docs.map((_) => _.toProto());
    }

    const response: huskysoft.gotagme.GetPhotoResponse = new huskysoft.gotagme.GetPhotoResponse({
      photos,
    })
    res.json(response);
    return response;
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
    const photo: Photo|null = await this._photoStore.findByPhotoID(photoID);
    if (!photo) {
      res.sendStatus(404);
      return;
    }
    res.json(photo.toProto());
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
  async postPhotos(req: Request, res: Response): Promise<void> {
    const user: User|undefined = req.user as User;
    if (!user) {
      res.status(403).json(new Error('Not logged in.'));
      return;
    }

    const request: huskysoft.gotagme.InsertPhotosRequest = req.body;
    let photos: Photo[] = [];
    if (request.requests) {
      try {
        const urls = request.requests.map<Url>(
            (request: huskysoft.gotagme.IInsertPhotoRequest) => {
              const url: Url|null = parseUrl(request.flickrUrl!);
              if (!url) {
                throw new Error('Could not parse request ' + request);
              }
              return url;
            });
        photos = await this.createPhotosFromFlickrUrlsPostedByUser(urls, user);
      } catch (err) {
        res.status(400).json(
            new Error('Failed to parse requests ' + request.requests));
        return;
      }
    } else {
      // TODO: Migrate to protos.
      const flickrAlbumUrls: string[]|undefined =
          req.body && req.body.flickrAlbumUrls as string[];
      if (!flickrAlbumUrls) {
        res.status(400).json(new Error('No photos provided.'));
        return;
      }
      const url: Url = parseUrl(flickrAlbumUrls[0]);
      if (url) {
        photos = await this.createPhotosFromFlickrAlbumUrl(url, user);
      }
    }

    // TODO: Add tags.

    res.status(201).json(photos);
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
    const photo: Photo|null = await this._photoStore.findByPhotoID(photoID);
    if (!photo) {
      res.sendStatus(404);
      return;
    }
    await this._photoStore.delete(photo);
    res.send(200);
  }

  /**
   * Method to get a tag's information by it's ID. Only use one of the two
   * parameters.
   * @param req.params.tagID The tagID to get. If provided, only the tag matching this ID will be returned. Takes
   * @param req.params.photoID The photoID for the photo which tags should be returned.
   */
  async handleGetTag(request: huskysoft.gotagme.GetTagsRequest, res: Response): Promise<void> {
    if (request.tagID) {
      const tag: Tag|null = await this._tagStore.findOneByTagID(request.tagID);
      if (!tag) {
        res.sendStatus(404);
        return;
      }
      res.json(new huskysoft.gotagme.GetTagsResponse({
        tags: [tag.toProto()],
      }));
      return;
    }

    if (request.photoID) {
      const tags: Tag[]|null = await this._tagStore.findByPhotoID(request.photoID);
      if (!tags) {
        res.sendStatus(404);
        return;
      }
      res.json(tags.map((_) => _.toProto()));
      return;
    }

    res.status(400).json({error: new Error('No tagID or photoID provided.')});
  }

  /**
   * Adds or updates a tag.
   * @param request.params.tagID The tagID if it is provided.
   * @param request.fields Tag data from body key-values:
   *   // The new status of a tag. Update only.
   *   state: 'accepted' || 'rejected',
   *   // The userID of who is adding the tag. Create only.
   *   addedBy: userID,
   *   // One of the following four fields. Create only.
   *     costumeID: costumeID, // The costume to tag.
   *     userID: userID, // The user to tag.
   *     userServerID: string, // A server ID for a user to tag.
   *     string: string, // The string to tag.
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
    if (!req.body) {
      throw new Error('No request.');
    }
    const tagID = req.params.tagID;
    if (tagID) {
      return this.handleModifyTag(
          tagID, huskysoft.gotagme.ModifyTagRequest.fromObject(req.body), res, req.user as User);
    }
    return this.handleAddTagsToPhoto(
        req.params.id, huskysoft.gotagme.AddTagsToPhotoRequest.fromObject(req.body), res,
        req.user as User);
  }

  async handleModifyTag(
      tagID: string, request: huskysoft.gotagme.ModifyTagRequest, res: Response, user: User) {
    const existing: Tag|null = await this._tagStore.findOneByTagID(tagID);
    if (!existing) {
      res.sendStatus(404);
      return;
    }
    const state: ApprovalState = approvalStateFromProto(request.state);
    if (state !== ApprovalState.Approved &&
        state !== ApprovalState.Rejected) {
      throw new Error(
          'Illegal status for updating existing tag: ' + existing.tagID);
    }
    const tag: huskysoft.gotagme.Tag = (await this._statusStore.setTagApprovalState(existing, state, user)).toProto();
    res.json(new huskysoft.gotagme.ModifyTagResponse({
      tag,
    }));
  }

  async handleAddTagsToPhoto(
      photoID: string, request: huskysoft.gotagme.AddTagsToPhotoRequest,
      res: Response, addedBy: User) {
    const photo: Photo|null = await this._photoStore.findByPhotoID(photoID);
    if (!photo) {
      res.sendStatus(404);
      return;
    }

    let returnTags: huskysoft.gotagme.ITag[]|undefined = undefined;
    if (request.tags) {
      returnTags = (await Promise.all(
          request.tags.map((apiTag: huskysoft.gotagme.ITag) =>
              this.handleAddAPITag(photo, apiTag, addedBy)))
        ).map((_) => _.toProto());
    }

    let capturedByTag: huskysoft.gotagme.ITag|undefined = undefined;
    if (request.capturedBy) {
      const apiCapturedBy: huskysoft.gotagme.Tag|null =
          huskysoft.gotagme.Tag.fromObject(request.capturedBy);
      let capturedByUser: User|null =
          await this._userStore.findOneByServerID(apiCapturedBy.key);
      if (!capturedByUser) {
        capturedByUser =
            await this._userStore.createUserWithAPITag(apiCapturedBy);
      }
      photo.capturedBy = capturedByUser;
      await this._photoStore.update(photo);
      capturedByTag = apiCapturedBy;
    }

    const response: huskysoft.gotagme.GetTagsResponse = new huskysoft.gotagme.GetTagsResponse({
      tags: returnTags,
      capturedBy: capturedByTag,
    });

    res.json(response);
  }

  async handleAddAPITag(
      photo: Photo, apiTag: huskysoft.gotagme.ITag,
      addedBy: User): Promise<Tag> {
    let tag: Tag|undefined;

    /** Users. */
    const taggedUser: User|null|undefined = apiTag.taggedUser &&
        await this._userStore.findOneByUserID(apiTag.taggedUser.id!);
    const serverIDUser: User|null =
        await this._userStore.findOneByServerID(apiTag.key!);
    if (taggedUser) {
      tag = await this._tagStore.addUserTagToPhoto(taggedUser, photo, addedBy);
    } else if (serverIDUser) {
      tag =
          await this._tagStore.addUserTagToPhoto(serverIDUser, photo, addedBy);
    } else if (!serverIDUser && apiTag.key) {
      const newUser: User = await this._userStore.createUserWithAPITag(apiTag);
      tag = await this._tagStore.addUserTagToPhoto(newUser, photo, addedBy);
    }

    /** Costumes. */
    if (apiTag.costume) {
      const costume: Costume|null =
          await this._costumeStore.findOneByCostumeID(apiTag.costume!.id!);
      if (!costume) {
        throw new Error('Unable to create tag for ' + apiTag);
      }
      tag = await this._tagStore.addCostumeTagToPhoto(costume, photo, addedBy);
    }

    /** Hashtags. */
    if (apiTag.hashtag) {
      tag = await this._tagStore.addStringTagToPhoto(
          apiTag.hashtag, photo, addedBy);
    }

    if (!tag) {
      throw new Error('Unable to create tag for ' + apiTag);
    }

    return tag;
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
    await this._statusStore.setTagApprovalStateByID(
        tagID, ApprovalState.Rejected, req.user! as User);
    res.send(200);
  }

  /**
   * Adds a new photo to the store based on a given flickr Url and user.
   * @param url The Url of the page on flickr for the image.
   * @param user The user who is posting the image.
   * @returns The newly inserted photo or an existing photo if it already exists
   * for the Url.
   */
  async createPhotoFromFlickrUrlPostedByUser(url: Url, postedBy: User):
      Promise<Photo> {
    const existingFlickrPhoto: FlickrPhoto|null =
        await this._flickrStore.findOneByFlickrPageUrl(url);
    // TODO: Reduce to one search.
    if (existingFlickrPhoto) {
      const photo: Photo|null = await this._photoStore.findOne({
        flickrPhoto: existingFlickrPhoto.document,
      });
      if (photo) {
        return photo;
      } else {
        // TODO: Log warning/error.
        throw new Error('Flickr photo existed without a Photo.');
      }
    }

    const apiPhoto: APIPhoto|undefined = await this._fetcher.photoByUrl(url);
    if (!apiPhoto) {
      throw new Error(
          'Unable to create a flickr API photo from url ' + url.href);
    }

    // Check again this isn't a duplicate. This can happen if the url provided
    // doesn't match exactly the url provided by flickr.
    const fetchedByID: FlickrPhoto|null =
        await this._flickrStore.findOneByFlickrID(apiPhoto.id!);
    // TODO: Reduce to one search.
    if (fetchedByID) {
      const photo: Photo|null = await this._photoStore.findOne({
        flickrPhoto: fetchedByID.document,
      });
      if (photo) {
        return photo;
      } else {
        // TODO: Log warning/error.
        throw new Error('Flickr photo existed without a Photo.');
      }
    }

    const flickrPhoto: FlickrPhoto =
        await this._flickrStore.fromFlickrAPIPhoto(apiPhoto);
    return this._photoStore.createFromFlickrPhotoPostedByUser(
        flickrPhoto, postedBy);
  }

  async createPhotosFromFlickrUrlsPostedByUser(urls: Url[], postedBy: User):
      Promise<Photo[]> {
    const results: Photo[] = await Promise.all(urls.map((url: Url) => {
      return this.createPhotoFromFlickrUrlPostedByUser(url, postedBy);
    }));
    return results;
  }

  /**
   * Takes a url of an image in an album, fetches the album, and creates Photos
   * for all items.
   * @description The actual album Url can't be used because the flickr API
   * requires the owner's NSID and we can't get that from the album Url. The
   * name in the album Url is the "path_name" and cannot be used to fetch the
   * NSID using their flickr.people.findByUsername.
   * @param url The url of an image from the album.
   * @param postedBy The user posting the images.
   */
  async createPhotosFromFlickrAlbumUrl(url: Url, postedBy: User):
      Promise<Photo[]> {
    const idPhoto: APIPhoto|undefined = await this._fetcher.photoByUrl(url);
    if (!idPhoto) {
      throw new Error(
          'Unable to create a flickr API photo from url ' + url.href);
    }
    const nsid: string = idPhoto.owner!.nsid!;

    // https://www.flickr.com/photos/kyotofox/33117017201/in/album-72157677604629673/
    const albumID: string = url.href!.split('/')[7].slice(6);

    const apiPhotos: APIPhoto[]|undefined =
        await this._fetcher.albumContentsByIDAndUserID(albumID, nsid);
    if (!apiPhotos) {
      throw new Error('Unable to fetch album contents.');
    }

    const photos: Photo[] = [];
    for (let i = 0; i < apiPhotos.length; i++) {
      const apiPhoto = apiPhotos[i];
      const flickrPhoto: FlickrPhoto =
          await this._flickrStore.fromFlickrAPIPhoto(apiPhoto);
      photos.push(await this._photoStore.createFromFlickrPhotoPostedByUser(
          flickrPhoto, postedBy));
    }
    return photos;
  }
}
