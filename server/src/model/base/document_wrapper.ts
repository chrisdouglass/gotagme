import {Document, Types} from 'mongoose';

export class DocumentWrapper<T extends Document> {
  model: T;
  constructor(document: T) {
    this.model = document;
  }
  isEqual(_: T) {
    throw new Error(
        'isEqual has not been implemented in this subclass of DocumentWrapper.');
  }
  get objectID(): Types.ObjectId {
    return new Types.ObjectId(this.model._id);
  }
}
