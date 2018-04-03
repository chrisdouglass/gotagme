import {ObjectID} from 'bson';
import {Request} from 'express';
import {Photo as APIPhoto} from 'flickr-sdk';
import {PaginateOptions, PaginateResult} from 'mongoose';
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

/**
 * Photo API handler.
 */
export class PhotoAPI {
  private photoStore: PhotoStore;
  private tagStore: TagStore;
  private costumeStore: CostumeStore;
  private userStore: UserStore;
  private statusStore: ApprovalStore;
  private fetcher: FlickrFetcher;
  private flickrStore: FlickrPhotoStore;

  constructor(
      photoStore: PhotoStore, tagStore: TagStore, costumeStore: CostumeStore,
      userStore: UserStore, statusStore: ApprovalStore,
      flickrPhotoStore: FlickrPhotoStore, flickrFetcher: FlickrFetcher) {
    this.photoStore = photoStore;
    this.tagStore = tagStore;
    this.costumeStore = costumeStore;
    this.userStore = userStore;
    this.statusStore = statusStore;

    this.fetcher = flickrFetcher;
    this.flickrStore = flickrPhotoStore;
  }

  /**
   * GET API for retrieving Photos.
   */
  async getPhotos(request: huskysoft.gotagme.photo.GetPhotoRequest):
      Promise<huskysoft.gotagme.photo.GetPhotoResponse> {
    let photos: huskysoft.gotagme.photo.Photo[] = [];
    if (request.id) {
      const photo: Photo|null = await this.photoStore.findByPhotoID(request.id);
      if (!photo) {
        throw new ResponseError(404);
      }
      photos = [photo.toProto()];
    } else {
      const result: PaginateResult<Photo> = await this.photoStore.paginate({}, {
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
    const photo: Photo|null = await this.photoStore.findByPhotoID(request.id);
    if (!photo) {
      throw new ResponseError(404);
    }
    await this.photoStore.delete(photo);
  }

  /**
   * Method to get a tag's information by it's ID. Only use one of the two
   * parameters.
   * @param request The GetTagsRequest proto.
   * @returns A GetTagsResponse.
   * @throws ResponseError
   */
  async handleGetTag(request: huskysoft.gotagme.tag.GetTagsRequest):
      Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const tags: Tag[]|null = await this.tagStore.findByPhotoID(request.photoID);
    if (!tags) {
      throw new ResponseError(404);
    }
    return new huskysoft.gotagme.tag.GetTagsResponse({
      tags: tags.map((_) => _.toProto()),
    });
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
    return this.handleAddTagsToPhoto(
        req.params.id,
        huskysoft.gotagme.tag.AddTagsToPhotoRequest.fromObject(req.body),
        req.user as User);
  }

  async handleModifyTag(
      tagID: string, request: huskysoft.gotagme.tag.ModifyTagRequest,
      user: User): Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const existing: Tag|null = await this.tagStore.findOneByTagID(tagID);
    if (!existing) {
      throw new NotFoundResponseError();
    }
    const state: ApprovalState = approvalStateFromProto(request.state);
    if (state !== ApprovalState.Approved && state !== ApprovalState.Rejected) {
      throw new Error(
          'Illegal status for updating existing tag: ' + existing.tagID);
    }
    const tag: huskysoft.gotagme.tag.Tag =
        (await this.statusStore.setTagApprovalState(existing, state, user))
            .toProto();
    return new huskysoft.gotagme.tag.GetTagsResponse({
      tags: [tag],
    });
  }

  async handleAddTagsToPhoto(
      photoID: string, request: huskysoft.gotagme.tag.AddTagsToPhotoRequest,
      addedBy: User): Promise<huskysoft.gotagme.tag.GetTagsResponse> {
    const photo: Photo|null = await this.photoStore.findByPhotoID(photoID);
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
          await this.userStore.findOneByServerID(apiCapturedBy.key);
      if (!capturedByUser) {
        capturedByUser =
            await this.userStore.createUserWithAPITag(apiCapturedBy);
      }
      photo.capturedBy = capturedByUser;
      await this.photoStore.update(photo);
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
    if (!apiTag.key) {
      throw new Error('API tag had no key ' + JSON.stringify(apiTag));
    }

    // Treat key as object ID first.
    const existingObjectID: ObjectID|null = (ObjectID.isValid(apiTag.key)) ?
        ObjectID.createFromHexString(apiTag.key) :
        null;
    if (existingObjectID) {
      const taggedUser: User|null =
          await this.userStore.findByObjectID(existingObjectID);
      if (taggedUser) {
        return this.tagStore.addUserTagToPhoto(taggedUser, photo, addedBy);
      }
      const taggedCostume: Costume|null =
          await this.costumeStore.findByObjectID(existingObjectID);
      if (taggedCostume) {
        return this.tagStore.addCostumeTagToPhoto(
            taggedCostume, photo, addedBy);
      }
      throw new Error(
          'Tag provided key ' + JSON.stringify(existingObjectID) +
          ' that was unhandled.');
    }

    // Key is a server ID.
    const serverIDUser: User|null =
        await this.userStore.findOneByServerID(apiTag.key!);
    if (serverIDUser) {
      return this.tagStore.addUserTagToPhoto(serverIDUser, photo, addedBy);
    } else {
      // Brand new user tag from Twitter.
      const newUser: User = await this.userStore.createUserWithAPITag(apiTag);
      return this.tagStore.addUserTagToPhoto(newUser, photo, addedBy);
    }
  }

  /**
   * Rejects a tag.
   * @param request.params.tagID The tagID to reject.
   */
  async handleRejectTag(
      request: huskysoft.gotagme.tag.RejectTagRequest,
      byUser: User): Promise<void> {
    await this.statusStore.setTagApprovalStateByID(
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
        await this.flickrStore.findOneByFlickrPageUrl(url);
    // TODO: Reduce to one search.
    if (existingFlickrPhoto) {
      const photo: Photo|null = await this.photoStore.findOne({
        flickrPhoto: existingFlickrPhoto.document,
      });
      if (photo) {
        return photo;
      } else {
        // TODO: Log warning/error.
        throw new Error('Flickr photo existed without a Photo.');
      }
    }

    const apiPhoto: APIPhoto|undefined = await this.fetcher.photoByUrl(url);
    if (!apiPhoto) {
      throw new Error(
          'Unable to create a flickr API photo from url ' + url.href);
    }

    // Check again this isn't a duplicate. This can happen if the url provided
    // doesn't match exactly the url provided by flickr.
    const fetchedByID: FlickrPhoto|null =
        await this.flickrStore.findOneByFlickrID(apiPhoto.id!);
    // TODO: Reduce to one search.
    if (fetchedByID) {
      const photo: Photo|null = await this.photoStore.findOne({
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
        await this.flickrStore.fromFlickrAPIPhoto(apiPhoto);
    return this.photoStore.createFromFlickrPhotoPostedByUser(
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
    const idPhoto: APIPhoto|undefined = await this.fetcher.photoByUrl(url);
    if (!idPhoto) {
      throw new Error(
          'Unable to create a flickr API photo from url ' + url.href);
    }
    const nsid: string = idPhoto.owner!.nsid!;

    // https://www.flickr.com/photos/kyotofox/33117017201/in/album-72157677604629673/
    const albumID: string = url.href!.split('/')[7].slice(6);

    const apiPhotos: APIPhoto[]|undefined =
        await this.fetcher.albumContentsByIDAndUserID(albumID, nsid);
    if (!apiPhotos) {
      throw new Error('Unable to fetch album contents.');
    }

    const photos: Photo[] = [];
    for (let i = 0; i < apiPhotos.length; i++) {
      const apiPhoto = apiPhotos[i];
      const flickrPhoto: FlickrPhoto =
          await this.flickrStore.fromFlickrAPIPhoto(apiPhoto);
      photos.push(await this.photoStore.createFromFlickrPhotoPostedByUser(
          flickrPhoto, postedBy));
    }
    return photos;
  }
}
