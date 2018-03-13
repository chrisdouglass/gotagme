require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {Photo} from '../../model/photo';
import {ExampleStore, ExampleDocument, Example} from '../example.store';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class ExampleStoreTest {
  private _connection: mongoose.Connection;
  private _store: ExampleStore;
  private _exampleDocument: ExampleDocument;
  private _example: Example;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new ExampleStore(this._connection);
    this._exampleDocument = {} as ExampleDocument;
    this._example = {} as Photo;
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new ExampleStore(this._connection);
    const document: ExampleDocument = {} as ExampleDocument;
    this._exampleDocument = document;
    const example: Example = await this._store.create(this._exampleDocument);
    example.should.exist('Example was not created by store from document.');
    this._example = example;
  }

  @test
  async test() {
    this._example.should.exist('Example should have existed.');
  }

  async after() {
    return this._connection.dropDatabase();
  }
}
