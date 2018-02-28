import {Document} from 'mongoose';

export class Model<T extends Document> {
  model: T;
  constructor(document: T) {
    this.model = document;
  }
}
