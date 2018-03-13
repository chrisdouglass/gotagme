import {Connection, Document, Model, Schema} from 'mongoose';

import {DocumentWrapper} from '../model/base/document_wrapper';

import {Store} from './store';

/** Fake values which should be declared in the model folder instead. */
export interface ExampleDocument extends Document {}
export class Example extends DocumentWrapper<ExampleDocument> {}

export class ExampleStore extends Store<ExampleDocument, Example> {
  constructor(connection: Connection) {
    const exampleModel: Model<ExampleDocument> =
        connection.model<ExampleDocument>('example', new Schema(), 'examples');
    super(exampleModel, Example);
  }
}
