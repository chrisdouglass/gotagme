require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {FlickrPhotoStore} from '../flickr_photo.store';
import {FlickrPhoto} from '../../model/photo/flickr_photo';
import {Photo as APIPhoto} from 'flickr-sdk';
import {example1JSON, example2JSON, example3JSON} from './fixtures/json';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class FlickrPhotoStoreTest {
  private _connection: mongoose.Connection;
  private _store: FlickrPhotoStore;

  constructor() {
    this._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
    this._store = new FlickrPhotoStore(this._connection);
  }

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.
  }

  async before() {
    this._store = new FlickrPhotoStore(this._connection);
  }

  @test
  async example1() {
    const photo: FlickrPhoto =
        await this._store.fromFlickrAPIPhoto(example1JSON as APIPhoto);
    chai.expect(photo).to.exist('Photo was not created.');
    // TODO: Verify important contents.
  }

  @test
  async example2() {
    const photo: FlickrPhoto =
        await this._store.fromFlickrAPIPhoto(example2JSON as APIPhoto);
    chai.expect(photo).to.exist('Photo was not created.');
    // TODO: Verify important contents.
  }

  @test
  async example3() {
    const photo: FlickrPhoto =
        await this._store.fromFlickrAPIPhoto(example3JSON as APIPhoto);
    chai.expect(photo).to.exist('Photo was not created.');
    // TODO: Verify important contents.
  }

  async after() {
    return this._connection.dropDatabase().then(() => this._connection.close());
  }
}
