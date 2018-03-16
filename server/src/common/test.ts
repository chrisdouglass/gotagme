import * as mongoose from 'mongoose';
import {Connection} from 'mongoose';
import { Mockgoose } from 'mockgoose';
import { MockgooseHelper } from 'mockgoose/built/mockgoose-helper';
import * as chai from 'chai';

export class DBTest {
  private static _connection: Connection;
  private static _mockgoose: Mockgoose;

  static async before() {
    chai.should();                    // Enables chai should.
    chai.use(require('dirty-chai'));  // For allowing chai function calls.

    this._mockgoose = new Mockgoose(require('mongoose'));
    return this._mockgoose.prepareStorage().then(() => {
      DBTest._connection = mongoose.createConnection(
          process.env.TEST_DB_URL, {useMongoClient: true});
    });
  }

  get mockgooseHelper(): MockgooseHelper {
    return DBTest._mockgoose.helper;
  }

  get connection(): Connection {
    if (!DBTest._connection) {
      throw new Error('There was no connection to mongoose.');
    }
    return DBTest._connection;
  }

  static async after() {
    return DBTest._connection.close();
  }
}
