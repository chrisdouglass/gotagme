import * as mongoose from 'mongoose';

export class Store<T extends mongoose.Document> {
  protected _model: mongoose.Model<T>;

  constructor(schemaModel: mongoose.Model<T>) {
    this._model = schemaModel;
  }

  async create(item: T) {
    return this._model.create(item);
  }

  async retrieve() {
    return this.find({});
  }

  async update(id: mongoose.Types.ObjectId, item: T): Promise<T> {
    return this._model.update({_id: id}, item);
  }

  async delete(id: string) {
    return this._model.remove({_id: this.toObjectId(id)});
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

  private toObjectId(id: string): mongoose.Types.ObjectId {
    return new mongoose.Types.ObjectId(id);
  }
}
