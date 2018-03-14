require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {Connection} from 'mongoose';
import {suite, test} from 'mocha-typescript';
import {CostumeStore} from '../costume.store';
import {Costume} from '../../model/costume';
import {User, UserDocument} from '../../model/user';
import {UserStore} from '../user.store';
import {AccountDocument} from '../../model/account';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class CostumeStoreTest {
  private static _connection: Connection;
  private _store!: CostumeStore;
  private _userStore!: UserStore;

  static before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.

    CostumeStoreTest._connection = mongoose.createConnection(
        process.env.TEST_DB_URL, {useMongoClient: true});
  }

  async before() {
    this._store = new CostumeStore(this.connection);
    this._userStore = new UserStore(this.connection);
  }

  @test
  async addNewCostume() {
    const costume: Costume = await this._store.createWithName();
    chai.expect(costume).to.exist('Costume with no name was not created.');

    const costume2: Costume = await this._store.createWithName('Strobes');
    chai.expect(costume2).to.exist('Costume with no name was not created.');
  }

  @test
  async addNameToCostume() {
    const names: string[] = ['Avery', 'Trapper'];
    const costume: Costume = await this._store.createWithName(names[0]);
    chai.expect(costume).to.exist('Costume with no name was not created.');
    costume.addName(names[1]);
    this._store.update(costume);

    (await this._store.findOneByCostumeID(
        costume.costumeID))!.names.should.deep.equal(names);
  }

  @test
  async deleteCostumeByID() {
    const costume: Costume = await this._store.createWithName('Sunny');
    await this._store.createWithName('Vincent');
    (await this._store.fetchAll()).length.should.equal(2);
    const deleted: Costume|null =
        await this._store.deleteByCostumeID(costume.costumeID);
    chai.expect(deleted).to.exist('No costume deleted.');
    (await this._store.fetchAll()).length.should.equal(1);
  }

  @test
  async findOneByCostumeID() {
    const costume: Costume = await this._store.createWithName();
    chai.expect((await this._store.findOneByCostumeID(costume.costumeID)))
        .to.exist('No costume found.');
  }

  @test
  async owners() {
    const costume: Costume = await this._store.createWithName('Avery');
    costume.addName('Trapper');
    costume.addOwner(await this.createUser());
    costume.addOwner(await this.createUser());
    chai.expect(await costume.save()).to.exist('Nothing was deleted.');

    const fetched: Costume|null =
        await this._store.findOneByCostumeID(costume.costumeID);
    chai.expect(fetched).to.exist('Costume was not saved.');
    fetched!.owners.length.should.equal(2);
  }

  @test.skip  // low
  async transferOwnership() {}

  @test.skip  // low
  async ownerHiddenState() {}

  @test
  async costumesForUser() {
    const owner: User = await this.createUser();
    const costume1: Costume = await this._store.createWithName('Wolf');
    costume1.addOwner(owner);
    await this._store.update(costume1);
    const costume2: Costume = await this._store.createWithName('Dog');
    costume2.addOwner(owner);
    await this._store.update(costume2);
    const otherOwner: User = await this.createUser();
    const costume3: Costume = await this._store.createWithName('Bee');
    costume3.addOwner(otherOwner);
    await this._store.update(costume3);

    (await this._store.findByUserID(owner.userID)).length.should.equal(2);
    (await this._store.findByUserID(otherOwner.userID)).length.should.equal(1);
  }

  @test.skip  // low
  async currentCostumesForUser() {}

  private get connection(): Connection {
    if (!CostumeStoreTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return CostumeStoreTest._connection;
  }

  private async createUser(): Promise<User> {
    const account: AccountDocument = {
      oauthToken: 'oauthToken',
      oauthSecret: 'oauthSecret',
    } as AccountDocument;
    return this._userStore.create({
      accounts: [account],
    } as UserDocument);
  }

  async after() {
    return this.connection.dropDatabase();
  }

  static async after() {
    return CostumeStoreTest._connection.close();
  }
}
