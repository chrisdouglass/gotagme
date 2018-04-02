import {Connection} from 'mongoose';

import {Costume, CostumeDocument, costumeModel} from '../model/costume';
import {User} from '../model/user';

import {Store} from './store';
import {UserStore} from './user.store';

export class CostumeStore extends Store<CostumeDocument, Costume> {
  private _userStore: UserStore;

  constructor(connection: Connection) {
    super(costumeModel(connection), Costume, [{path: 'owners'}]);
    this._userStore = new UserStore(connection);
  }

  async createWith(addedByID: string, name?: string, ownerID?: string):
      Promise<Costume> {
    const addedBy: User|null =
        addedByID ? await this._userStore.findOneByUserID(addedByID) : null;
    if (!addedBy) {
      throw new Error('Added by user not found.');
    }
    const owner: User|null =
        ownerID ? await this._userStore.findOneByUserID(ownerID) : null;
    return this.create({
      addedBy: addedBy.document,
      names: name ? [name] : [],
      owners: owner ? [owner.document] : [],
    } as CostumeDocument);
  }

  async findOneByCostumeID(costumeID: string): Promise<Costume|null> {
    return this.findOne({
      costumeID,
    });
  }

  async findByUserID(userID: string): Promise<Costume[]> {
    // TODO: Replace with direct query.
    const user: User|null = await this._userStore.findOneByUserID(userID);
    if (!user) {
      return [];
    }
    return this.find({
      'owners': user.document,
    });
  }

  async findByCurrentOwnerUserID(userID: string): Promise<Costume[]> {
    const costumes: Costume[] = await this.findByUserID(userID);
    // TODO: Find using query instead.
    return costumes.filter(
        (costume: Costume) =>
            !!costume.owner && costume.owner.userID === userID);
  }

  async findByText(text: string): Promise<Costume[]> {
    return this.find({
      names: {$regex: text, '$options': 'i'},
    })
  }

  async deleteByCostumeID(costumeID: string): Promise<Costume|null> {
    const toRemove: Costume|null = await this.findOneByCostumeID(costumeID);
    if (!toRemove) {
      throw new Error('No costume to remove for ID ' + costumeID);
    }
    return this.delete(toRemove);
  }
}
