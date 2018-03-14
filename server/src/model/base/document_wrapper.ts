import {Document, ModelPopulateOptions, Types} from 'mongoose';

export class DocumentWrapper<T extends Document> {
  document: T;
  constructor(document: T, prepopulatePaths?: string[]) {
    this.document = document;

    if (prepopulatePaths && prepopulatePaths.length) {
      this.document.populate({
        path: prepopulatePaths.join(' '),
      } as ModelPopulateOptions);
    }
  }
  isEqual(_: T) {
    throw new Error(
        'isEqual has not been implemented in this subclass of DocumentWrapper.');
  }
  get objectID(): Types.ObjectId {
    return new Types.ObjectId(this.document._id);
  }
  async save(): Promise<T> {
    return this.document.save();
  }
}
