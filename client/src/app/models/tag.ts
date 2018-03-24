import {Url} from 'url';

import {User} from './user';

export interface Tag {
  tagID: string;
  kind: TagKind,
  created: number;  // timestamp
  state: TagApprovalState;
  localizedDateString: string;
  taggedUser: User;
  // costume: Costume;
  // hashtag: string;
  externalUrl: Url;
  imageUrl: Url;
}

export enum TagKind {
  User = 'user',
  Costume = 'costume',
  String = 'string',
}

export enum TagApprovalState {
  New = 'new',
  Approved = 'approved',
  Rejected = 'rejected',
}
