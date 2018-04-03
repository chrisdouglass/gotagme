import * as Flickr from 'flickr-sdk';
import {Photo as APIPhoto} from 'flickr-sdk';

import {FlickrFetcher} from '../../../flickr/flickr_fetcher';
import {apiPhoto1JSON} from '../../../store/test/fixtures/api_photos.fixture';
import {photosetResponseJSON} from '../../../store/test/fixtures/photosets.fixture';

export class FakeFlickrFetcher extends FlickrFetcher {
  // Ensure things crash if they haven't been overridden.
  constructor() {
    super({} as Flickr);
  }

  async photoByID(photoID: string): Promise<APIPhoto> {
    let photo: APIPhoto = (apiPhoto1JSON as APIPhoto);
    photo = JSON.parse(JSON.stringify(photo)) as APIPhoto;
    photo.id = photoID;
    photo.urls.url[0]._content =
        'https://www.flickr.com/photos/windows8253/' + photoID + '/';
    return photo;
  }

  async albumContentsByIDAndUserID({}, {}): Promise<APIPhoto[]> {
    let photoset: APIPhoto[] = photosetResponseJSON.photo;
    photoset = JSON.parse(JSON.stringify(photoset)) as APIPhoto[];
    return photoset;
  }
}
