import {Connection} from 'mongoose';

import {StringAnyMap} from '../common/types';
import {ApprovalStatus} from '../model/approval';
import {Costume} from '../model/costume';
import {Photo} from '../model/photo';
import {Tag, TagDocument, TagKind, tagModel} from '../model/tag';
import {User} from '../model/user';

import {ApprovalStore} from './approval.store';
import {CostumeStore} from './costume.store';
import {PhotoStore} from './photo.store';
import {Store} from './store';
import {UserStore} from './user.store';

export class TagStore extends Store<TagDocument, Tag> {
  private _connection: Connection;
  private _photoStore: PhotoStore;
  private _costumeStore: CostumeStore;
  private _userStore: UserStore;

  constructor(connection: Connection) {
    super(tagModel(connection), Tag, [
      {path: 'addedBy'},
      {path: 'photo'},
      {path: 'costume'},
      {path: 'user'},
      {
        path: 'currentStatus',
        populate: {
          path: 'setBy',
        },
      },
      {
        path: 'photo',
        populate: {
          path: 'flickrPhoto',
        },
      },
    ]);
    this._connection = connection;
    this._photoStore = new PhotoStore(connection);
    this._costumeStore = new CostumeStore(connection);
    this._userStore = new UserStore(connection);
  }

  /**
   * Methods to add tags to photos.
   * @param value The tag to add.
   * @param photo The photo to modify.
   * @param addedByUser The user who is adding the tag.
   */
  async addStringTagToPhoto(value: string, photo: Photo, addedByUser: User) {
    return this.addTagToPhotoByKind(TagKind.String, value, photo, addedByUser);
  }
  async addCostumeTagToPhoto(value: Costume, photo: Photo, addedByUser: User) {
    return this.addTagToPhotoByKind(TagKind.Costume, value, photo, addedByUser);
  }
  async addUserTagToPhoto(value: User, photo: Photo, addedByUser: User) {
    return this.addTagToPhotoByKind(TagKind.User, value, photo, addedByUser);
  }

  /**
   * Adds a new with the given value to a photo.
   * @param value The value to add.
   * @param photo The photo to tag.
   * @param addedBy The user adding the tag.
   */
  async addTagValueToPhoto(
      value: Costume|User|string, photo: Photo, addedBy: User) {
    if (typeof value === 'string') {
      return this.addStringTagToPhoto(value as string, photo, addedBy);
    } else if (value instanceof Costume) {
      return this.addCostumeTagToPhoto(value as Costume, photo, addedBy);
    } else {
      return this.addUserTagToPhoto(value as User, photo, addedBy);
    }
  }

  /**
   * Adds a new tag to a photo from a kind and value.
   * @param kind The kind of tag to add.
   * @param value The value for the tag. The type of this value must match the
   * type of the tag.
   * @param photo The photo to add the tag.
   * @param addedByUser The user who is adding the tag.
   */
  private async addTagToPhotoByKind(
      kind: TagKind, value: Costume|User|string, photo: Photo,
      addedByUser: User): Promise<Tag> {
    const existing: Tag|null = await this.findOneByValueAndPhoto(value, photo);
    if (existing) {
      return existing;
    }

    return this.createWith(kind, value, photo, addedByUser);
  }

  /**
   * Returns the tag with the given tagID.
   * @param tagID The tagID for searching.
   */
  async findOneByTagID(tagID: string): Promise<Tag|null> {
    return this.findOne({tagID});
  }

  /**
   * Gets all tags on a photo.
   * @param photo The photo for getting tags.
   */
  async findByPhoto(photo: Photo): Promise<Tag[]> {
    return this.find({
      'photo': photo.document,
    });
  }

  /**
   * Gets all tags on a photo given its tagID.
   * @param photoID The photo ID to search.
   */
  async findByPhotoID(photoID: string): Promise<Tag[]|undefined> {
    // TODO: Find by subdocument value instead.
    const photo: Photo|null = await this._photoStore.findByPhotoID(photoID);
    if (!photo) {
      return undefined;
    }
    return this.findByPhoto(photo);
  }

  /**
   * Finds all tags with the given value.
   * @param value The value of the tag to find.
   */
  async findByValue(value: Costume|User|string): Promise<Tag[]> {
    const conditions: StringAnyMap = {};
    if (value instanceof Costume) {
      conditions['costume'] = value.document;
    } else if (value instanceof User) {
      conditions['user'] = value.document;
    } else if (typeof value === 'string') {
      conditions['string'] = value;
    } else {
      throw new Error('Unhandled value type.');
    }
    return this.find(conditions);
  }

  /**
   * Returns the tag matching the value on the given photo.
   * @param value The value to match.
   * @param photo The photo to search.
   */
  async findOneByValueAndPhoto(value: Costume|User|string, photo: Photo):
      Promise<Tag|null> {
    const conditions: StringAnyMap = {
      photo: photo.document,
    };
    if (value instanceof Costume) {
      conditions['costume'] = value.document;
    } else if (value instanceof User) {
      conditions['user'] = value.document;
    } else {
      conditions['string'] = value;
    }
    return this.findOne(conditions);
  }

  /**
   * Gets the photos of a costume.
   * @param costumeID The costume of which to fetch photos.
   */
  async photosForCostumeID(costumeID: string): Promise<Photo[]|null> {
    const costume: Costume|null =
        await this._costumeStore.findOneByCostumeID(costumeID);
    if (!costume) {
      return null;
    }
    const tags: Tag[]|null = await this.findByValue(costume);
    return tags.map((tag: Tag) => tag.photo);
  }

  /**
   * Gets the photos containing a tag of a user.
   * @param userID The user of which to fetch photos.
   */
  async photosForUserID(userID: string): Promise<Photo[]|null> {
    const user: User|null = await this._userStore.findOneByUserID(userID);
    if (!user) {
      return null;
    }
    const tags: Tag[]|null = await this.findByValue(user);
    return tags.map((tag: Tag) => tag.photo);
  }

  /**
   * Removes a tag from a photo based on its value.
   * @param value The value of the tag to remove.
   * @param photo The photo which has the tag to remove.
   */
  async removeTagFromPhotoByValue(value: Costume|User|string, photo: Photo):
      Promise<Tag|null> {
    const tag: Tag|null = await this.findOneByValueAndPhoto(value, photo);
    if (!tag) {
      throw new Error(
          'Tag not found for value ' + value + ' photoID ' + photo.photoID);
    }
    return this.delete(tag);
  }

  /** Private */
  private async createWith(
      kind: TagKind, value: Costume|User|string, toPhoto: Photo,
      addedBy: User): Promise<Tag> {
    const tagDocument: TagDocument = {
      kind,
      photo: toPhoto.document,
      addedBy: addedBy.document,
    } as TagDocument;
    switch (kind) {
      case TagKind.Costume: {
        if (!(value instanceof Costume)) {
          throw new Error('Tag kind mismatch ' + kind + ' to ' + value);
        }
        tagDocument.costume = value.document;
        break;
      }
      case TagKind.String: {
        if (!(typeof value === 'string')) {
          throw new Error('Tag kind mismatch ' + kind + ' to ' + value);
        }
        tagDocument.string = value;
        break;
      }
      case TagKind.User: {
        if (!(value instanceof User)) {
          throw new Error('Tag kind mismatch ' + kind + ' to ' + value);
        }
        tagDocument.user = value.document;
        break;
      }
      default: { throw new Error('Unhandled tag kind ' + kind); }
    }

    const tag: Tag = await this.create(tagDocument);
    const status: ApprovalStatus = await new ApprovalStore(this._connection)
                                       .createNewTagStatus(tag, addedBy);
    tag.document.currentState = status.document.state;
    return tag;
  }
}
