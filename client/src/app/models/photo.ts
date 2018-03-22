import {User} from './user';

export class Photo {
  photoID: string;
  postedBy: User;
  capturedBy: User;
  capturedAt: number;
  status: string;
  flickrUrl: string;
  smallImageUrl: string;
  largeImageUrl: string;
  xlargeImageUrl: string;
  origImageUrl: string;
}
