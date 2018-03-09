import * as mongoose from 'mongoose';
import {Document, Schema} from 'mongoose';
import * as shortid from 'shortid';
import {DocumentWrapper} from '../base/document_wrapper';
import {UserDocument} from '../user/user';

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

/** Represents a Costume document in Mongo. */
export interface CostumeDocument extends Document {
  costumeID: string;
  names: string[];         // In order from first to last.
  owners: UserDocument[];  // In order from first to last.
}

/** Private schema definition. Keep in sync with the above Document. */
export const costumeSchema: Schema = new Schema({
  costumeID: {type: String, default: shortid.generate, required: true},
  names: [String],
  owners: {
    type: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
});

/**
 * Creates a model factory used by the stores to generate model objects.
 * @param connection The mongoose connection to use for persistence.
 */
export const costumeModel =
    mongoose.model<CostumeDocument>('costume', costumeSchema, 'costumes');
