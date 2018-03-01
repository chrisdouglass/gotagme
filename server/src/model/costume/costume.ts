import * as mongoose from 'mongoose';

import {DocumentWrapper} from '../base/document_wrapper';

import {CostumeDocument} from './costume.document';
import {costumeSchema} from './costume.schema';

export class Costume extends DocumentWrapper<CostumeDocument> {
  constructor(costumeModel: CostumeDocument) {
    super(costumeModel);
  }

  get costumeID(): string {
    return this.model.costumeID;
  }

  // TODO: Names
  // TODO: Owners
}
Object.seal(Costume);

export const costumeModel =
    mongoose.model<CostumeDocument>('costume', costumeSchema, 'costumes');
