import {Document, Model, Schema, Connection} from 'mongoose';
import {Store} from './store';
import { DocumentWrapper } from '../model/base/document_wrapper';

/** Fake values which should be declared in the model folder instead. */
export interface ExampleDocument extends Document {}
export class Example extends DocumentWrapper<ExampleDocument> {}

export class ExampleStore extends Store<ExampleDocument, Example> {
  constructor(connection: Connection) {
    let exampleModel: Model<ExampleDocument> = connection.model<ExampleDocument>('example', new Schema(), 'examples');
    super(exampleModel, Example);
  }
}
