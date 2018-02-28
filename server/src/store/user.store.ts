import * as mongoose from 'mongoose';

import {UserDocument} from '../model/user/user.document';
import {User, userModelFactory} from '../model/user/user.model';

import {Store} from './store';

export class UserStore extends Store<UserDocument, User> {
  constructor(connection: mongoose.Connection) {
    super(userModelFactory(connection), User);
  }
}

Object.seal(UserStore);
