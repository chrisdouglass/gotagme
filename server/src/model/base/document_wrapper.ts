import {Document} from 'mongoose';

export class DocumentWrapper<T extends Document> {
  model: T;
  constructor(document: T) {
    this.model = document;
  }
}
