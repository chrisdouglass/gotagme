import {Connection} from 'mongoose';

import {StringAnyMap} from '../common/types';
import {ApprovalState, ApprovalStatus} from '../model/base/approval';
import {Costume} from '../model/costume';
import {Photo} from '../model/photo';
import {Tag, TagDocument, TagKind, tagModel} from '../model/tag';
import {User} from '../model/user';

import {Store} from './store';

export class TagStore extends Store<TagDocument, Tag> {
  constructor(connection: Connection) {
    super(tagModel(connection), Tag, 'addedBy statuses.setBy');
  }

  /**
   * Override to update current status.
   */
  async create(doc: TagDocument) {
    const statuses: ApprovalStatus[] = doc.statuses;
    doc.currentStatus = statuses[statuses.length - 1];
    return super.create(doc);
  }
  async update(tag: Tag): Promise<void> {
    tag.updateCurrentStatus();
    return super.update(tag);
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
   * Finds all tags with the given value.
   * @param value The value of the tag to find.
   */
  async findByValue(value: Costume|User|string): Promise<Tag[]> {
    const conditions: StringAnyMap = {};
    if (value instanceof Costume) {
      conditions['costume'] = value.document;
    } else if (value instanceof User) {
      conditions['user'] = value.document;
    } else {
      conditions['string'] = value;
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
   * Removes a tag from a photo based on its value.
   * @param value The value of the tag to remove.
   * @param photo The photo which has the tag to remove.
   */
  // TODO: Test is currently disabled.
  async removeTagFromPhotoByValue(value: Costume|User|string, photo: Photo):
      Promise<Tag|null> {
    const tag: Tag|null = await this.findOneByValueAndPhoto(value, photo);
    if (!tag) {
      throw new Error(
          'Tag not found for value ' + value + ' photoID ' + photo.photoID);
    }
    return this.delete(tag);
  }

  /**
   * Sets the approval state of a tag by appending a new approval state.
   * @param photo The photo which owns the tag.
   * @param tag The tag to modify.
   * @param state The new state to apply.
   * @param byUser The user applying the state.
   * @return The array of current statuses for the tag.
   */
  async setTagApprovalState(tagID: string, state: ApprovalState, byUser: User):
      Promise<void> {
    const tag: Tag|null = await this.findOneByTagID(tagID);
    if (!tag) {
      throw new Error('Tag not found.');
    }
    const newStatus: ApprovalStatus = {
      state,
      setBy: byUser.document,
    } as ApprovalStatus;

    tag.appendStatus(newStatus);
    return this.update(tag);
  }

  /** Private */
  private async createWith(
      kind: TagKind, value: Costume|User|string, toPhoto: Photo,
      addedBy: User): Promise<Tag> {
    const tagDocument: TagDocument = {
      kind,
      photo: toPhoto.document,
      addedBy: addedBy.document,
      statuses: [{
        state: ApprovalState.New,
        setBy: addedBy.document,
      } as ApprovalStatus]
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

    return this.create(tagDocument);
  }
}
