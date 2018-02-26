import * as mongoose from 'mongoose';
if (!mongoose) {}  // Hack to silence unused mongoose warning.
import * as shortid from 'shortid';
import {
  arrayProp, ModelType, prop, Ref, Typegoose, staticMethod, instanceMethod
} from 'typegoose';

import { User } from '../user/user';

class Costume extends Typegoose {
  @prop({ required: true })
  costumeID?: string;

  @prop()
  name?: string;

  @arrayProp({ itemsRef: User })
  owners?: Array<Ref<User>>;

  @staticMethod
  static create(this: ModelType<Costume>) {
    const costume = new CostumeModel({
      costumeID: shortid.generate(),
    });
    return costume;
  }

  @instanceMethod
  get currentOwner() {
    return this.owners ? this.owners[0] : undefined;
  }
}

// tslint:disable-next-line: variable-name
const CostumeModel = new Costume().getModelForClass(Costume);

export { Costume, CostumeModel };
