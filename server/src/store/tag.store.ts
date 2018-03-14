import {Connection, Model} from 'mongoose';

import {Tag, TagDocument, tagSchema} from '../model/tag';

import {Store} from './store';

export class TagStore extends Store<TagDocument, Tag> {
  constructor(connection: Connection) {
    const costumeModel: Model<TagDocument> =
        connection.model<TagDocument>('Tag', tagSchema, 'tags');
    super(costumeModel, Tag);
  }
}
