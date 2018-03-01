import * as mongoose from 'mongoose';
import {DocumentWrapper} from '../model/base/document_wrapper';

export class Store<T extends mongoose.Document, U extends DocumentWrapper<T>> {
  // The mongoose model which will be used for creating the backing mongoose
  // objects.
  private _model: mongoose.Model<T>;
  // Provides access to the constructor of the U type for creating the wrapper
  // objects.
  private _type: {new(document: T): U;};  // tslint:disable-line: no-any

  // tslint:disable-next-line: no-any
  constructor(schemaModel: mongoose.Model<T>, type: {new(document: T): U;}) {
    this._model = schemaModel;
    this._type = type;
  }

  async create(item: T): Promise<U> {
    return this._model.create(item).then((document: T) => {
      return new this._type(document);
    });
  }

  async retrieve(): Promise<T[]> {
    return this.find({});
  }

  async update(id: mongoose.Types.ObjectId, item: T): Promise<T> {
    return this._model.update({_id: id}, item);
  }

  async delete(id: string): Promise<void> {
    return this._model.remove({_id: Store.StringToObjectId(id)});
  }

  async findById(id: string): Promise<T|null> {
    return this._model.findById(id);
  }

  async findOne(cond?: {}): Promise<T|null> {
    return this._model.findOne(cond);
  }

  async find(cond?: {}, fields?: {}, options?: {}): Promise<T[]> {
    return this._model.find(cond, fields, options);
  }

  private static StringToObjectId(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }
}
