import { Store } from './store';

import { UserDocument } from '../model/user/user.document';
import { userModel } from '../model/user/user.model';

export class UserStore extends Store<UserDocument> {
  constructor() {
    super(userModel);
  }
}

Object.seal(UserStore);
