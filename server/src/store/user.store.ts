import {Connection} from 'mongoose';
import {AccountDocument} from '../model/account';
import {User, UserDocument, userModel} from '../model/user';

import {Store} from './store';

export class UserStore extends Store<UserDocument, User> {
  constructor(connection: Connection) {
    super(userModel(connection), User);
  }

  /**
   * Creates a user using OAuth keys and a Server ID.
   * @param oauthToken The OAuth token.
   * @param oauthSecret The OAuth secret.
   */
  async createUserWithServerIDAndOAuthKeys(
      serverID: string, oauthToken: string, oauthSecret: string): Promise<User|null> {
    const account: AccountDocument = {
      serverID,
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
  async findOneByServerID(serverID: string): Promise<User|null> {
    return this.findOne({
      'accounts.serverID': serverID,
    });
  }

  /**
   * Returns the user matching the userID if it exists.
   * @param userID The userID to search.
   */
  async findOneByUserID(userID: string) {
    return this.findOne({
      userID,
    });
  }
}
