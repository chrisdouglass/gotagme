import * as mongoose from 'mongoose';
import {DocumentWrapper} from '../model/base/document_wrapper';

export class Store<T extends mongoose.Document, U extends DocumentWrapper<T>> {
  // The mongoose model which will be used for creating the backing mongoose
  // objects.
  private _model: mongoose.Model<T>;
  // Provides access to the constructor of the U type for creating the wrapper
  // objects.
  private _wrapper: {new(document: T): U;};

  constructor(schemaModel: mongoose.Model<T>, wrapper: {new(document: T): U;}) {
    this._model = schemaModel;
    this._wrapper = wrapper;
  }

  async create(item: T): Promise<U> {
    return this._model.create(item).then((document: T) => {
      return new this._wrapper(document);
    });
  }

  async fetchAll(): Promise<U[]> {
    return this.find({});
  }

  // TODO: Merge with create to make an "upsert" for documents where id is
  // optional.
  /*
  async update(id: mongoose.Types.ObjectId, document: T): Promise<U> {
    return this._model.update({_id: id}, document).then((document: T) => {
      return new this._wrapper(document);
    });
  }
  */

  async update(wrapper: U): Promise<void> {
    return this._model.update({_id: wrapper.id}, wrapper.model);
  }

  async delete(obj: U): Promise<void> {
    return this._model.remove({_id: obj.id});
  }

  async findByID(id: string): Promise<U|null> {
    return this.findOne({
      _id: id,
    });
  }

  async findOne(cond?: {}): Promise<U|null> {
    return this._model.findOne(cond).then().then((document) => {
      if (!document) {
        return null;
      }
      return new this._wrapper(document as T);
    });
  }

  async find(cond?: {}, fields?: {}, options?: {}): Promise<U[]> {
    return this._model.find(cond, fields, options)
        .then<T[]>()
        .then((documents) => {
          return documents.map((document: T) => new this._wrapper(document));
        });
  }
}
