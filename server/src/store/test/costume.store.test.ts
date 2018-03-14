require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {Connection} from 'mongoose';
import {suite, test} from 'mocha-typescript';
import {CostumeStore} from '../costume.store';
import {Costume} from '../../model/costume';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class CostumeStoreTest {
  private static _connection: Connection;
  private _store!: CostumeStore;

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.

    CostumeStoreTest._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
  }

  async before() {
    this._store = new CostumeStore(this.connection);
  }

  @test
  async addNewCostumeNoName() {
    const costume: Costume = await this._store.createWithName();
    chai.expect(costume).to.exist('Costume with no name was not created.');
  }

  @test
  async addNewCostumeWithNames() {
    const names: string[] = ['Avery', 'Trapper'];
    const costume: Costume = await this._store.createWithName(names[0]);
    chai.expect(costume).to.exist('Costume with no name was not created.');
    costume.addName(names[1]);
    this._store.update(costume);

    (await this._store.findOneByCostumeID(
        costume.costumeID))!.names.should.deep.equal(names);
  }

  @test
  async findOneByCostumeID() {
    const costume: Costume = await this._store.createWithName();
    chai.expect((await this._store.findOneByCostumeID(costume.costumeID)))
        .to.exist('No costume found.');
  }

  @test.skip
  async owners() {}

  @test.skip  // low
  async transferOwnership() {}

  @test.skip
  async addNameToCostume() {}

  @test.skip  // low
  async ownerHiddenState() {}

  @test.skip
  async costumesForUser() {}

  private get connection(): Connection {
    if (!CostumeStoreTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return CostumeStoreTest._connection;
  }

  async after() {
    return this.connection.dropDatabase();
  }

  static async after() {
    return CostumeStoreTest._connection.close();
  }
}
