import * as mongoose from 'mongoose';

import {AccountDocument} from '../model/account/account.document';
import {User, UserDocument, userModelFactory} from '../model/user/user';

import {Store} from './store';

export class UserStore extends Store<UserDocument, User> {
  constructor(connection: mongoose.Connection) {
    super(userModelFactory(connection), User);
  }

  /**
   * Gets a user using OAuth keys and optionally inserts a new User if one is
   * not found.
   * @param oauthToken The OAuth token.
   * @param oauthSecret The OAuth secret.
   * @param insert If true, this method will return a new user if one does not
   * already exist.
   */
  async userForOAuthKeys(
      oauthToken: string, oauthSecret: string,
      insert: boolean): Promise<User|null> {
    const existingUser: User|null = await this.findOne({
      'accounts.oauthToken': oauthToken,
      'accounts.oauthSecret': oauthSecret,
    });
    if (existingUser || !insert) {
      return existingUser;
    }

    const account: AccountDocument = {
      oauthToken,
      oauthSecret,
    } as AccountDocument;

    return this.create({
      accounts: [account],
    } as UserDocument);
  }

  /**
   * Returns the existing user for the provided serverID if it exists.
   * @param serverID The server ID for the user.
   */
  async userForServerID(serverID: string): Promise<User|null> {
    return this.findOne({
      'accounts.serverID': serverID,
    });
  }

  /**
   * Returns the user matching the usedID if it exists.
   * @param userID The userID to search.
   */
  async userForUserID(userID: string) {
    return this.findOne({
      userID,
    });
  }
}
