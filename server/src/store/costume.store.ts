import {Connection, Model} from 'mongoose';

import {Costume, CostumeDocument, costumeSchema} from '../model/costume';

import {Store} from './store';

export class CostumeStore extends Store<CostumeDocument, Costume> {
  constructor(connection: Connection) {
    const costumeModel: Model<CostumeDocument> =
        connection.model<CostumeDocument>('Costume', costumeSchema, 'costumes');
    super(costumeModel, Costume);
  }
}
