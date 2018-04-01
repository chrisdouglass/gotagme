require('dotenv').load();  // Load env as early as possible.

import * as chai from 'chai';
// Must import as require in order to mutate .Promise.
import mongoose = require('mongoose');
import {suite, test} from 'mocha-typescript';
import {CostumeStore} from '../costume.store';
import {Costume} from '../../model/costume';
import {User} from '../../model/user';
import {DBTest} from '../../common/test';

// Configure Promise.
global.Promise = require('bluebird').Promise;
mongoose.Promise = global.Promise;

@suite
export class CostumeStoreTest extends DBTest {
  private _store!: CostumeStore;

  async before() {
    await super.before();
    this._store = new CostumeStore(this.connection);
  }

  @test
  async addNewCostume() {
    const addedBy: User = await this.createUser();
    const costume: Costume = await this._store.createWith(addedBy.userID);
    chai.expect(costume).to.exist('Costume with no name was not created.');

    const costume2: Costume =
        await this._store.createWith(addedBy.userID, 'Strobes');
    chai.expect(costume2).to.exist('Costume with no name was not created.');
  }

  @test
  async addNameToCostume() {
    const names: string[] = ['Avery', 'Trapper'];
    const addedBy: User = await this.createUser();
    const costume: Costume =
        await this._store.createWith(addedBy.userID, names[0]);
    chai.expect(costume).to.exist('Costume with no name was not created.');
    costume.addName(names[1]);
    this._store.update(costume);

    (await this._store.findOneByCostumeID(
        costume.costumeID))!.names.should.deep.equal(names);
  }

  @test
  async deleteCostumeByID() {
    const addedBy: User = await this.createUser();
    const costume: Costume =
        await this._store.createWith(addedBy.userID, 'Sunny');
    await this._store.createWith(addedBy.userID, 'Vincent');
    (await this._store.fetchAll()).length.should.equal(2);
    const deleted: Costume|null =
        await this._store.deleteByCostumeID(costume.costumeID);
    chai.expect(deleted).to.exist('No costume deleted.');
    (await this._store.fetchAll()).length.should.equal(1);
  }

  @test
  async findOneByCostumeID() {
    const addedBy: User = await this.createUser();
    const costume: Costume = await this._store.createWith(addedBy.userID);
    chai.expect((await this._store.findOneByCostumeID(costume.costumeID)))
        .to.exist('No costume found.');
  }

  @test
  async owners() {
    const addedBy: User = await this.createUser();
    const costume: Costume =
        await this._store.createWith(addedBy.userID, 'Avery');
    costume.addName('Trapper');
    costume.addOwner(await this.createUser());
    costume.addOwner(await this.createUser());
    chai.expect(await costume.save()).to.exist('Nothing was saved.');

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
    const addedBy: User = await this.createUser();
    const costume1: Costume =
        await this._store.createWith(addedBy.userID, 'Wolf');
    costume1.addOwner(owner);
    await this._store.update(costume1);
    const costume2: Costume =
        await this._store.createWith(addedBy.userID, 'Dog');
    costume2.addOwner(owner);
    const otherOwner: User = await this.createUser();
    costume2.addOwner(otherOwner);
    await this._store.update(costume2);
    const costume3: Costume =
        await this._store.createWith(addedBy.userID, 'Bee');
    costume3.addOwner(otherOwner);
    await this._store.update(costume3);

    (await this._store.findByUserID(owner.userID)).length.should.equal(2);
    (await this._store.findByUserID(otherOwner.userID)).length.should.equal(2);
  }

  @test
  async currentCostumesForUser() {
    const owner: User = await this.createUser();
    const addedBy: User = await this.createUser();
    const costume1: Costume =
        await this._store.createWith(addedBy.userID, 'Wolf');
    costume1.addOwner(owner);
    await this._store.update(costume1);
    const costume2: Costume =
        await this._store.createWith(addedBy.userID, 'Dog');
    costume2.addOwner(owner);
    const otherOwner: User = await this.createUser();
    costume2.addOwner(otherOwner);
    await this._store.update(costume2);
    const costume3: Costume =
        await this._store.createWith(addedBy.userID, 'Bee');
    costume3.addOwner(otherOwner);
    await this._store.update(costume3);

    const ownerCostumes: Costume[] =
        await this._store.findByCurrentOwnerUserID(owner.userID);
    ownerCostumes.length.should.equal(1);
    ownerCostumes[0].costumeID.should.equal(costume1.costumeID);
    const otherOwnerCostumes: Costume[] =
        await this._store.findByCurrentOwnerUserID(otherOwner.userID);
    otherOwnerCostumes.length.should.equal(2);
    otherOwnerCostumes[0].costumeID.should.equal(costume2.costumeID);
    otherOwnerCostumes[1].costumeID.should.equal(costume3.costumeID);
  }

  async after() {
    return this.connection.dropDatabase();
  }
}
