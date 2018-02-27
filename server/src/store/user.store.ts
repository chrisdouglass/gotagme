import {UserDocument} from '../model/user/user.document';
import {userModel} from '../model/user/user.model';

import {Store} from './store';

export class UserStore extends Store<UserDocument> {
  constructor() {
    super(userModel);
  }
}

Object.seal(UserStore);
