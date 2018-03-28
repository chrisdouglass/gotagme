import {NextFunction, Request, RequestHandler, Response, Router} from 'express';
import {Photo as APIPhoto} from 'flickr-sdk';
import {Connection, PaginateOptions, PaginateResult} from 'mongoose';
import {parse as parseUrl, Url} from 'url';

import {NotFoundResponseError, ResponseError} from '../../common/types';
import {FlickrFetcher} from '../../flickr/flickr_fetcher';
import {ApprovalState} from '../../model/approval';
import {Costume} from '../../model/costume';
import {FlickrPhoto, Photo} from '../../model/photo';
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
import {Handlers} from '../shared/handlers';
import {RouterProvider} from '../shared/router_provider';

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
        .get(({}: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.photo.GetPhotoRequest =
              new huskysoft.gotagme.photo.GetPhotoRequest({
                page: 1,
              });
          this._photoAPI.getPhotos(request)
              .then((response: huskysoft.gotagme.photo.GetPhotoResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              const request: huskysoft.gotagme.photo.InsertPhotosRequest =
                  new huskysoft.gotagme.photo.InsertPhotosRequest(req.body);
              this._photoAPI.postPhotos(request, req.user as User)
                  .then(
                      (response:
                           huskysoft.gotagme.photo.InsertPhotosResponse) => {
                        res.status(201).json(response);
                      })
                  .catch(next);
            })
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
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.photo.GetPhotoRequest =
              new huskysoft.gotagme.photo.GetPhotoRequest({
                id: req.params.id,
              });
          this._photoAPI.getPhotos(request)
              .then((response: huskysoft.gotagme.photo.GetPhotoResponse) => {
                res.send(response);
              })
              .catch(next);
        })
        .post(Handlers.notImplemented)
        .put(Handlers.notImplemented)
        .delete(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              const request: huskysoft.gotagme.photo.DeletePhotoRequest =
                  new huskysoft.gotagme.photo.DeletePhotoRequest({
                    id: req.params.id,
                  });
              this._photoAPI.deletePhoto(request)
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch(next);
            });

    router.route('/:id/tag/:tagID?')
        .get((req: Request, res: Response, next: NextFunction) => {
          const request: huskysoft.gotagme.tag.GetTagsRequest =
              new huskysoft.gotagme.tag.GetTagsRequest({
                tagID: req.params.tagID,
                photoID: req.params.id,
              });
          this._photoAPI.handleGetTag(request)
              .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                res.json(response);
              })
              .catch(next);
        })
        .post(
            this._authHandler,
            (req: Request, res: Response, next: NextFunction) => {
              this._photoAPI.handlePostTag(req)
                  .then((response: huskysoft.gotagme.tag.GetTagsResponse) => {
                    res.json(response);
                  })
                  .catch(next);
            })
        .put(Handlers.notImplemented)
        .delete(
            Handlers.basicAuthenticate,
            (req: Request, res: Response, next: NextFunction) => {
              this._photoAPI
                  .handleRejectTag(
                      new huskysoft.gotagme.tag.RejectTagRequest({
                        id: req.params.tagID,
                      }),
                      req.user as User)
                  .then(() => {
                    res.sendStatus(200);
                  })
                  .catch(next);
            });
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
  async getPhotos(request: huskysoft.gotagme.photo.GetPhotoRequest):
      Promise<huskysoft.gotagme.photo.GetPhotoResponse> {
    let photos: huskysoft.gotagme.photo.Photo[] = [];
    if (request.id) {
      const photo: Photo|null =
          await this._photoStore.findByPhotoID(request.id);
      if (!photo) {
        throw new ResponseError(404);
      }
      photos = [photo.toProto()];
    } else {
      const result: PaginateResult<Photo> =
          await this._photoStore.paginate({}, {
            page: request.page,
          } as PaginateOptions);
      photos = result.docs.map((_) => _.toProto());
    }

    const response: huskysoft.gotagme.photo.GetPhotoResponse =
        new huskysoft.gotagme.photo.GetPhotoResponse({
          photos,
        });
    return response;
  }

  /**
   * POST API for creating or updating a new Photo.
   */
  async postPhotos(
      request: huskysoft.gotagme.photo.InsertPhotosRequest,
      addedBy: User): Promise<huskysoft.gotagme.photo.InsertPhotosResponse> {
    let photos: Photo[] = [];
    if (request.requests && request.requests.length > 0) {
      try {
        const urls = request.requests.map<Url>(
            (request: huskysoft.gotagme.photo.IInsertPhotoRequest) => {
              const url: Url|null = parseUrl(request.flickrUrl!);
              if (!url) {
                throw new ResponseError(
                    400, 'Invalid flickr Url ' + request.flickrUrl);
              }
              return url;
            });
        photos =
            await this.createPhotosFromFlickrUrlsPostedByUser(urls, addedBy);
      } catch (err) {
        throw new ResponseError(
            400, 'Failed to parse requests ' + request.requests);
      }
    } else if (request.flickrAlbumUrl) {
      const url: Url = parseUrl(request.flickrAlbumUrl);
      if (url) {
        photos = await this.createPhotosFromFlickrAlbumUrl(url, addedBy);
      } else {
        throw new ResponseError(
            400, 'Invalid album Url ' + request.flickrAlbumUrl);
      }
    } else {
      throw new ResponseError(400, 'Request missing Urls');
    }

    // TODO: Add tags.
    return new huskysoft.gotagme.photo.InsertPhotosResponse({
      photos: photos.map((_) => _.toProto()),
    });
  }

  /**
   * DELETE API for removing a Photo.
   */
  async deletePhoto(request: huskysoft.gotagme.photo.DeletePhotoRequest):
      Promise<void> {
    if (!request.id) {
      throw new ResponseError(400, 'No ID given.');
    }
    const photo: Photo|null = await this._photoStore.findByPhotoID(request.id);
    if (!photo) {
      throw new ResponseError(404);
    }
    await this._photoStore.delete(photo);
  }

  /**
   * Method to get a tag's information by it's ID. Only use one of the two
   * parameters.
   * @param req.params.tagID The tagID to get. If provided, only the tag
   * matching this ID will be returned. Takes
   * @param req.params.photoID The photoID for the photo which tags should be
   * returned.
   * @throws ResponseError
   */
  async handleGetTag(request: huskysoft.gotagme.tag.GetTagsRequest):
      Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    if (request.tagID) {
      const tag: Tag|null = await this._tagStore.findOneByTagID(request.tagID);
      if (!tag) {
        throw new ResponseError(404);
      }
      return new huskysoft.gotagme.tag.GetTagsResponse({
        tags: [tag.toProto()],
      });
    }

    if (request.photoID) {
      const tags: Tag[]|null =
          await this._tagStore.findByPhotoID(request.photoID);
      if (!tags) {
        throw new ResponseError(404);
      }
      return new huskysoft.gotagme.tag.GetTagsResponse({
        tags: tags.map((_) => _.toProto()),
      });
    }

    throw new ResponseError(400, 'No tagID or photoID provided.');
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
  async handlePostTag(req: Request):
      Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    if (!req.body) {
      throw new Error('No request.');
    }
    const tagID = req.params.tagID;
    if (tagID) {
      return this.handleModifyTag(
          tagID, huskysoft.gotagme.tag.ModifyTagRequest.fromObject(req.body),
          req.user as User);
    }
    return this.handleAddTagsToPhoto(
        req.params.id,
        huskysoft.gotagme.tag.AddTagsToPhotoRequest.fromObject(req.body),
        req.user as User);
  }

  async handleModifyTag(
      tagID: string, request: huskysoft.gotagme.tag.ModifyTagRequest,
      user: User): Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const existing: Tag|null = await this._tagStore.findOneByTagID(tagID);
    if (!existing) {
      throw new NotFoundResponseError();
    }
    const state: ApprovalState = approvalStateFromProto(request.state);
    if (state !== ApprovalState.Approved && state !== ApprovalState.Rejected) {
      throw new Error(
          'Illegal status for updating existing tag: ' + existing.tagID);
    }
    const tag: huskysoft.gotagme.tag.Tag =
        (await this._statusStore.setTagApprovalState(existing, state, user))
            .toProto();
    return new huskysoft.gotagme.tag.GetTagsResponse({
      tags: [tag],
    });
  }

  async handleAddTagsToPhoto(
      photoID: string, request: huskysoft.gotagme.tag.AddTagsToPhotoRequest,
      addedBy: User): Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const photo: Photo|null = await this._photoStore.findByPhotoID(photoID);
    if (!photo) {
      throw new NotFoundResponseError();
    }

    let returnTags: huskysoft.gotagme.tag.ITag[]|undefined = undefined;
    if (request.tags) {
      returnTags = (await Promise.all(request.tags.map(
                        (apiTag: huskysoft.gotagme.tag.ITag) =>
                            this.handleAddAPITag(photo, apiTag, addedBy))))
                       .map((_) => _.toProto());
    }

    let capturedByTag: huskysoft.gotagme.tag.ITag|undefined = undefined;
    if (request.capturedBy) {
      const apiCapturedBy: huskysoft.gotagme.tag.Tag|null =
          huskysoft.gotagme.tag.Tag.fromObject(request.capturedBy);
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

    const response: huskysoft.gotagme.tag.GetTagsResponse =
        new huskysoft.gotagme.tag.GetTagsResponse({
          tags: returnTags,
          capturedBy: capturedByTag,
        });

    return response;
  }

  async handleAddAPITag(
      photo: Photo, apiTag: huskysoft.gotagme.tag.ITag,
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
  async handleRejectTag(
      request: huskysoft.gotagme.tag.RejectTagRequest,
      byUser: User): Promise<void> {
    await this._statusStore.setTagApprovalStateByID(
        request.id, ApprovalState.Rejected, byUser);
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
