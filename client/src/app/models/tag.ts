import {Url} from 'url';

import {User} from './user';

export interface Tag {
  date: Date;
  localizedDateString: string;
  user: User;
  externalUrl: Url;
  imageUrl: Url;
}
