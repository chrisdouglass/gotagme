import * as mongoose from 'mongoose';
if (!mongoose) {}  // Hack to silence unused mongoose warning.
import * as shortid from 'shortid';
import {
  arrayProp, InstanceType, ModelType, prop, Ref, Typegoose, staticMethod
} from 'typegoose';

import { Costume } from '../costume/costume';

class Account {
  @prop({ required: true })
  oauthToken?: string;

  @prop({ required: true })
  oauthSecret?: string;

  @prop()
  displayName?: string;

  @prop()
  username?: string;
}

class User extends Typegoose {
  @prop({ required: true, default: shortid.generate() })
  userID?: string;

  @arrayProp({ required: true, items: Account })
  accounts?: Account[];

  @prop()
  displaName?: string;

  @arrayProp({ itemsRef: Costume })
  costumes?: Array<Ref<Costume>>;

  @staticMethod
  static async findByTokens(
      this: ModelType<User>, oauthToken: string, oauthSecret: string) {
    return this.findOne({
      'accounts.oauthAccessToken': oauthToken,
      'accounts.oauthAccessSecret': oauthSecret,
    });
  }

  @staticMethod
  static async upsertByTokens(
      this: ModelType<User> & typeof User,
      oauthToken: string,
      oauthSecret: string) {
    return this.findByTokens(oauthToken, oauthSecret)
        .then((user: InstanceType<User> | null) => {
      if (user) {
        return user;
      }
      const account = {
          'oauthToken': oauthToken,
          'oauthSecret': oauthSecret
      };
      const accountArray = [account];
      return this.create({accounts: accountArray});
    });
  }
}

// tslint:disable-next-line: variable-name
const UserModel = new User().getModelForClass(User);

export { Account, User, UserModel };
