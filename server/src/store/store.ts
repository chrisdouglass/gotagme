import {Document, Model, ModelPopulateOptions, PaginateModel, PaginateOptions, PaginateResult, Types} from 'mongoose';

import {DocumentWrapper} from '../model/base/document_wrapper';

export abstract class Store<T extends Document, U extends DocumentWrapper<T>> {
  // The mongoose model which will be used for creating the backing mongoose
  // objects.
  private _model: Model<T>;
  // Provides access to the constructor of the U type for creating the wrapper
  // objects.
  private _wrapper: {new(document: T): U;};
  private _populateOptions: string|ModelPopulateOptions[];

  constructor(
      schemaModel: Model<T>, wrapper: {new(document: T): U;},
      populateOptions?: string|ModelPopulateOptions[]) {
    this._model = schemaModel;
    this._wrapper = wrapper;
    this._populateOptions = populateOptions ? populateOptions : [];
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
  async delete(obj: U): Promise<U|null> {
    const val: T|null = await this._model.findByIdAndRemove(obj.objectID);
    return !val ? null : new this._wrapper(val);
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
    const document: T|null =
        await this._model.findOne(cond).populate(this._populateOptions);
    return !document ? null : new this._wrapper(document);
  }

  /**
   * Returns all objects matching the given conditions, prepopulated with the
   * @param cond The conditions to search.
   * @param fields Optional fields to prepopulate.
   */
  async find(cond?: {}, fields?: {}): Promise<U[]> {
    const documents: T[] =
        await this._model.find(cond, fields).populate(this._populateOptions);
    return documents.map((document: T) => new this._wrapper(document));
  }

  /**
   * Performs a paginated search on models which support it.
   * @param cond The conditions to search.
   * @param options The paginate result options.
   */
  async paginate(cond: {}, options: PaginateOptions):
      Promise<PaginateResult<U>> {
    const paginateModel: PaginateModel<T> = (this._model as PaginateModel<T>);
    if (!paginateModel || !paginateModel.paginate) {
      throw new Error('Paginate called on a non-paginate model.');
    }
    const result: PaginateResult<T> =
        await paginateModel.paginate(cond, options);
    const wrappers: U[] =
        result.docs.map<U>((doc: T) => new this._wrapper(doc));
    return {
      docs: wrappers,
      total: result.total,
      limit: result.limit,
      page: result.page,
      pages: result.pages,
      offset: result.offset,
    } as PaginateResult<U>;
  }
}
