require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
import mongoose = require('mongoose'); // Use require in order to mutate .Promise.
import {suite, test} from 'mocha-typescript';
import {Connection, Document, Model, Schema} from 'mongoose';
import {generate as generateShortID} from 'shortid';
import {DocumentWrapper} from '../../model/base/document_wrapper';
import {Store} from '../store';
import {DBTest} from '../../common/test';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

// Setup a fake object model and store with vanilla behavior.
interface TestDocument extends Document {
  fooID: string;
  someValue: string;
}
class TestObj extends DocumentWrapper<TestDocument> {
  constructor(testModel: TestDocument) {
    super(testModel);
  }
  get fooID(): string {
    return this.document.fooID;
  }
  get someValue(): string {
    return this.document.someValue;
  }
  set someValue(value: string) {
    this.document.someValue = value;
  }
}
const testModelFactory = (connection: Connection): Model<TestDocument> =>
    connection.model<TestDocument>(
        'test', new Schema({
          fooID: {type: String, default: generateShortID},
          someValue: {type: String, default: 'someValue'},
        }),
        'tests');
class TestStore extends Store<TestDocument, TestObj> {
  constructor(connection: Connection) {
    super(testModelFactory(connection), TestObj);
  }
}

@suite
export class StoreTest extends DBTest {
  private _store!: TestStore;
  private _document!: TestDocument;
  private _obj!: TestObj;

  async before() {
    this._store = new TestStore(this.connection);
    this._document = {} as TestDocument;
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

  @test
  async update() {
    const freshObj: TestObj|null =
        await this._store.findByObjectID(this._obj.objectID);
    chai.expect(freshObj).to.not.be.null('Could not fetch a fresh object.');

    const expected = 'a new value';
    freshObj!.someValue = expected;
    await this._store.update(freshObj!);

    const updatedObj: TestObj|null =
        await this._store.findByObjectID(this._obj.objectID);
    updatedObj!.someValue.should.equal(expected);
  }

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

  @test
  async find() {
    for (let i = 0; i < 9; i++) {
      await this._store.create(this._document);
    }
    const objects: TestObj[] = await this._store.find({});
    objects.length.should.equal(10);
  }

  async after() {
    return this.connection.dropDatabase();
  }
}
