require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
import mongoose = require('mongoose'); // Use require in order to mutate .Promise.
import {suite, test} from 'mocha-typescript';
import {Connection, Document, Model, Schema} from 'mongoose';
import {DocumentWrapper} from '../../model/base/document_wrapper';
import {Store} from '../store';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

// Setup a fake object model and store with vanilla behavior.
export interface TestDocument extends Document { fooID: string; }
export class TestObj extends DocumentWrapper<TestDocument> {
  constructor(testModel: TestDocument) {
    super(testModel);
  }
  get fooID(): string {
    return this.model.fooID;
  }
}
export const testModelFactory = (connection: Connection): Model<TestDocument> =>
    connection.model<TestDocument>(
        'test', new Schema({fooID: {type: String, default: 'fooID'}}), 'tests');
class TestStore extends Store<TestDocument, TestObj> {
  constructor(connection: mongoose.Connection) {
    super(testModelFactory(connection), TestObj);
  }
}

@suite
export class StoreTest {
  private _connection: mongoose.Connection;
  private _store: TestStore;
  private _document: TestDocument;
  private _obj: TestObj;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new TestStore(this._connection);
    this._document = {} as TestDocument;
    this._obj = {} as TestObj;
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new TestStore(this._connection);
    const testObj: TestObj = await this._store.create(this._document);
    testObj.should.exist('User was not created by store from document.');
    this._obj = testObj;
  }

  @test
  async fetchAll() {
    const objects: TestObj[] = await this._store.fetchAll();
    objects.length.should.equal(1);
    objects[0].fooID.should.equal(this._obj.fooID);
  }

  @test.skip  // TODO: Implement.
  async update() {}

  @test
  async delete() {
    await this._store.delete(this._obj);
    chai.expect(await this._store.findByObjectID(this._obj.objectID))
        .to.be.null('Object was not deleted.');
  }

  @test
  async findByObjectID() {
    const obj: TestObj|null =
        await this._store.findByObjectID(this._obj.objectID);
    chai.expect(obj).to.exist('Object was not found in the DB.');
    obj!.fooID.should.equal(this._obj.fooID);
  }

  @test.skip  // TODO: Reenable when multiple objects can be searched.
  async find() {
    const objects: TestObj[] = await this._store.find({});
    objects.length.should.equal(1);
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}
