import {Connection} from 'mongoose';

import {Costume, CostumeDocument, costumeModel} from '../model/costume';

import {Store} from './store';

export class CostumeStore extends Store<CostumeDocument, Costume> {
  constructor(connection: Connection) {
    super(costumeModel(connection), Costume);
  }

  async createWithName(name?: string): Promise<Costume> {
    return this.create({
      names: name ? [name] : [],
    } as CostumeDocument);
  }

  async findOneByCostumeID(costumeID: string) {
    return this.findOne({
      costumeID,
    });
  }
}
