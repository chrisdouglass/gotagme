import {Connection} from 'mongoose';

import {Costume, CostumeDocument, costumeModel} from '../model/costume';
import {User} from '../model/user';

import {Store} from './store';
import {UserStore} from './user.store';

export class CostumeStore extends Store<CostumeDocument, Costume> {
  private _connection: Connection;  // TODO: Remove this.

  constructor(connection: Connection) {
    super(costumeModel(connection), Costume, 'owners');
    this._connection = connection;
  }

  async createWithName(name?: string): Promise<Costume> {
    return this.create({
      names: name ? [name] : [],
    } as CostumeDocument);
  }

  async findOneByCostumeID(costumeID: string): Promise<Costume|null> {
    return this.findOne({
      costumeID,
    });
  }

  async findByUserID(userID: string): Promise<Costume[]> {
    // TODO: Replace with direct query.
    const user: User|null =
        await (new UserStore(this._connection)).findOneByUserID(userID);
    if (!user) {
      return [];
    }
    return this.find({
      'owners': user.document,
    });
  }

  async deleteByCostumeID(costumeID: string): Promise<Costume|null> {
    const toRemove: Costume|null = await this.findOneByCostumeID(costumeID);
    if (!toRemove) {
      throw new Error('No costume to remove for ID ' + costumeID);
    }
    return this.delete(toRemove);
  }
}
