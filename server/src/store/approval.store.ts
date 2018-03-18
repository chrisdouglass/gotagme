import {Connection} from 'mongoose';

import {ApprovalState} from '../common/types';
import {ApprovalStatus, ApprovalStatusDocument} from '../model/approval';
import {approvalStatusModel, ApprovalStatusType} from '../model/approval/approval';
import {Photo} from '../model/photo';
import {Tag} from '../model/tag';
import {User} from '../model/user';

import {PhotoStore} from './photo.store';
import {Store} from './store';
import {TagStore} from './tag.store';

export class ApprovalStore extends
    Store<ApprovalStatusDocument, ApprovalStatus> {
  private _tagStore: TagStore;
  private _photoStore: PhotoStore;

  constructor(connection: Connection) {
    super(approvalStatusModel(connection), ApprovalStatus, 'setBy');

    this._tagStore = new TagStore(connection);
    this._photoStore = new PhotoStore(connection);
  }

  /**
   * Creates a new ApprovalStatus while updating the current state of the photo
   * or tag referenced in the status.
   * @param document The source document for the ApprovalStatus.
   * @returns The new ApprovalStatus.
   */
  async create(document: ApprovalStatusDocument): Promise<ApprovalStatus> {
    const status: ApprovalStatus = await super.create(document);
    switch (status.type) {
      case ApprovalStatusType.Photo: {
        const photo: Photo = status.photo!;
        photo.document.currentState = status.document.state;
        await this._photoStore.update(photo);
        break;
      }
      case ApprovalStatusType.Tag: {
        const tag: Tag = status.tag!;
        tag.document.currentState = status.document.state;
        await this._tagStore.update(tag);
        break;
      }
      default:
        throw new Error('Unhandled approval status type.');
    }
    return status;
  }

  /**
   * Creates a New-state status and adds it to the given tag by the given user.
   * @param tag The tag for appending a status.
   * @param setBy The user setting the status.
   * @returns The new ApprovalStatus.
   */
  async createNewTagStatus(tag: Tag, setBy: User): Promise<ApprovalStatus> {
    return this.createTagStatus(tag, ApprovalState.New, setBy);
  }

  /**
   * Creates a status and adds it to a tag.
   * @param tag The tag for appending a status.
   * @param state The state to add.
   * @param setBy The user adding the status.
   * @returns The new ApprovalStatus.
   */
  private async createTagStatus(tag: Tag, state: ApprovalState, setBy: User):
      Promise<ApprovalStatus> {
    return this.create({
      state,
      setBy: setBy.document,
      type: ApprovalStatusType.Tag,
      tag: tag.document,
    } as ApprovalStatusDocument);
  }

  /**
   * Sets the approval state of a tag by appending a new approval state.
   * @param photo The photo which owns the tag.
   * @param tag The tag to modify.
   * @param state The new state to apply.
   * @param byUser The user applying the state.
   * @returns The modified tag.
   */
  async setTagApprovalStateByID(
      tagID: string, state: ApprovalState, byUser: User): Promise<Tag> {
    const tag: Tag|null = await this._tagStore.findOneByTagID(tagID);
    if (!tag) {
      throw new Error('Tag not found.');
    }
    return this.setTagApprovalState(tag, state, byUser);
  }

  /**
   * Sets the approval state of a tag by creating a status for the tag.
   * @param tag
   * @param state
   * @param setBy
   * @returns The modified tag.
   */
  async setTagApprovalState(tag: Tag, state: ApprovalState, setBy: User):
      Promise<Tag> {
    await this.createTagStatus(tag, state, setBy);
    return tag;
  }

  /**
   * Retrieves the statuses for a tag.
   * @param tag The tag for retrieving statuses.
   * @returns An array of ApprovalStatus for the given tag.
   */
  async statusesForTag(tag: Tag): Promise<ApprovalStatus[]> {
    return this.find({
      tag: tag.document,
    });
  }

  /**
   * Creates a New-state status and adds it to the given photo by the given
   * user.
   * @param photo The photo for appending a status.
   * @param setBy The user setting the status.
   * @returns The new ApprovalStatus.
   */
  async createNewPhotoStatus(photo: Photo, setBy: User):
      Promise<ApprovalStatus> {
    return this.createPhotoStatus(photo, ApprovalState.New, setBy);
  }

  /**
   * Creates a status and adds it to a photo.
   * @param photo The photo for appending a status.
   * @param state The state to add.
   * @param setBy The user adding the status.
   * @returns The new ApprovalStatus.
   */
  private async createPhotoStatus(
      photo: Photo, state: ApprovalState,
      setBy: User): Promise<ApprovalStatus> {
    return this.create({
      state,
      setBy: setBy.document,
      type: ApprovalStatusType.Photo,
      photo: photo.document,
    } as ApprovalStatusDocument);
  }

  /**
   * Retrieves the statuses for a photo.
   * @param photo The photo for retrieving statuses.
   * @returns An array of ApprovalStatus for the given photo.
   */
  async statusesForPhoto(photo: Photo): Promise<ApprovalStatus[]> {
    return this.find({
      photo: photo.document,
    });
  }
}
