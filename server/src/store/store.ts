import {Document, Model, Types} from 'mongoose';
import {DocumentWrapper} from '../model/base/document_wrapper';

export class Store<T extends Document, U extends DocumentWrapper<T>> {
  // The mongoose model which will be used for creating the backing mongoose
  // objects.
  private _model: Model<T>;
  // Provides access to the constructor of the U type for creating the wrapper
  // objects.
  private _wrapper: {new(document: T): U;};

  constructor(schemaModel: Model<T>, wrapper: {new(document: T): U;}) {
    this._model = schemaModel;
    this._wrapper = wrapper;
  }

  async create(item: T): Promise<U> {
    const document: T = await this._model.create(item);
    return new this._wrapper(document);
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

  /**
   * Updates an object in the store matching the given object.
   * @param wrapper The DocumentWrapper to use as the source of update data.
   */
  async update(wrapper: U): Promise<void> {
    return this._model.update({_id: wrapper.objectID}, wrapper.document);
  }

  /**
   * Removes a given object from the store.
   * @param obj The object to remove.
   */
  async delete(obj: U): Promise<void> {
    await this._model.findByIdAndRemove(obj.objectID);
  }

  /**
   * Retrieves the object with the given ObjectId.
   * @param objectID The ObjectId to search.
   */
  async findByObjectID(objectID: Types.ObjectId): Promise<U|null> {
    return this.findOne({_id: objectID});
  }

  /**
   * Retrieves the first object matching the given conditions.
   * @param cond The conditions to search.
   * @param fields Optional fields to prepopulate.
   */
  async findOne(cond?: {}): Promise<U|null> {
    const document: T|null = await this._model.findOne(cond);
    return !document ? null : new this._wrapper(document);
  }

  /**
   * Returns all objects matching the given conditions, prepopulated with the
   * @param cond The conditions to search.
   * @param fields Optional fields to prepopulate.
   */
  async find(cond?: {}, fields?: {}): Promise<U[]> {
    const documents: T[] = await this._model.find(cond, fields);
    return documents.map((document: T) => new this._wrapper(document));
  }
}
