import {Connection, Model} from 'mongoose';
import {Document, Schema} from 'mongoose';
import * as shortid from 'shortid';

import {DocumentWrapper} from '../base/document_wrapper';
import {User, UserDocument} from '../user';

export class Costume extends DocumentWrapper<CostumeDocument> {
  constructor(costumeModel: CostumeDocument) {
    super(costumeModel);
  }

  get costumeID(): string {
    return this.document.costumeID;
  }

  get name(): string|undefined {
    return !(this.names.length > 0) ? undefined : this.names[0];
  }

  addName(name: string) {
    this.document.names.push(name);
  }

  get names(): string[] {
    return this.document.names;
  }

  get owner(): User|undefined {
    return !(this.owners.length > 0) ? undefined : this.owners[0];
  }

  get owners(): User[] {
    return this.document.owners.map((owner: UserDocument) => new User(owner));
  }
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
  names: [{type: String, required: true, default: []}],
  owners: [{type: Schema.Types.ObjectId, ref: 'User'}],
});

/**
 * Creates a model factory used by the stores to generate model objects.
 * @param connection The mongoose connection to use for persistence.
 */
export const costumeModel = (connection: Connection): Model<CostumeDocument> =>
    connection.model<CostumeDocument>('Costume', costumeSchema, 'costumes');
