import * as mongoose from 'mongoose';
import {CostumeDocument} from './costume.document';
import {costumeSchema} from './costume.schema';

export class Costume {
  private _model: CostumeDocument;

  private constructor(_costumeModel: CostumeDocument) {
    this._model = _costumeModel;
  }

  get costumeID(): string {
    return this._model.costumeID;
  }

  // TODO: Names
  // TODO: Owners
}
Object.seal(Costume);

export const costumeModel =
    mongoose.model<CostumeDocument>('costume', costumeSchema, 'costumes');
