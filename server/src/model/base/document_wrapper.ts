import {Document, Types} from 'mongoose';

export class DocumentWrapper<T extends Document> {
  document: T;
  constructor(document: T) {
    this.document = document;
  }
  isEqual(_: T) {
    throw new Error(
        'isEqual has not been implemented in this subclass of DocumentWrapper.');
  }
  get objectID(): Types.ObjectId {
    return new Types.ObjectId(this.document._id);
  }
  async save(): Promise<DocumentWrapper<T>> {
    await this.document.save();
    return this;
  }
}
