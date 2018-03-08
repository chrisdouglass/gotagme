import * as mongoose from 'mongoose';
import {PhotoResponse} from 'flickr-sdk';

import {FlickrPhoto, FlickrPhotoDocument, flickrPhotoModelFactory, Owner} from '../model/photo/flickr_photo';

import {Store} from './store';

export class FlickrPhotoStore extends Store<FlickrPhotoDocument, FlickrPhoto> {
  constructor(connection: mongoose.Connection) {
    super(flickrPhotoModelFactory(connection), FlickrPhoto);
  }

  async fromFlickrAPIPhoto(APIPhoto: PhotoResponse) {
    return new Promise((resolve, reject) => {
      const photo: FlickrPhotoDocument = {} as FlickrPhotoDocument;
      if (!APIPhoto.id) {
        return reject(new Error('Flickr photo had no flickr ID.'));
      }
      photo.flickrID = APIPhoto.id;
      photo.title = APIPhoto.title ? APIPhoto.title._content : '';
      photo.description = APIPhoto.description ? APIPhoto.description._content : '';
      if (APIPhoto.dateuploaded) {
        photo.uploadDate = +APIPhoto.dateuploaded;
      } else if (APIPhoto.dates && APIPhoto.dates.posted) {
        photo.uploadDate = Date.parse(APIPhoto.dates.posted);
      }
      photo.uploadDate = APIPhoto.dateuploaded ? +APIPhoto.dateuploaded : 0;
      if (APIPhoto.dates && APIPhoto.dates.taken) {
        photo.captureDate = Date.parse(APIPhoto.dates.taken);
      }
      if (APIPhoto.owner) {
        photo.owner = {
          id: APIPhoto.owner.nsid,
          username: APIPhoto.owner.path_alias || APIPhoto.owner.username,
          displayName: APIPhoto.owner.username,
          realName: APIPhoto.owner.realname,
        } as Owner;
      }

      if (APIPhoto.urls && APIPhoto.urls.url) {
        photo.flickrPageURL = APIPhoto.urls.url[0]._content;
      }

      /*
      https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
        or
      https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
        or
      https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
      s small square 75x75
      q large square 150x150
      t thumbnail, 100 on longest side
      m small, 240 on longest side
      n small, 320 on longest side
      - medium, 500 on longest side
      z medium 640, 640 on longest side
      c medium 800, 800 on longest side†
      b large, 1024 on longest side*
      h large 1600, 1600 on longest side†
      k large 2048, 2048 on longest side†
      o original image, either a jpg, gif or png, depending on source format
      * Before 5/25/2010 large photos only exist for very large original images.
      † Medium 800, large 1600, and large 2048 photos only exist after 3/1/2012.
      */
      if (APIPhoto.farm && APIPhoto.server && APIPhoto.secret) {
        photo.smallImageURL = 'http://farm' + APIPhoto.farm +
            '.staticflickr.com/' + APIPhoto.server + '/' + APIPhoto.id + '_' +
            APIPhoto.secret + '.jpg';
        photo.mediumImageURL = 'http://farm' + APIPhoto.farm +
            '.staticflickr.com/' + APIPhoto.server + '/' + APIPhoto.id + '_' +
            APIPhoto.secret + '_c.jpg';
        photo.largeImageURL = 'http://farm' + APIPhoto.farm +
            '.staticflickr.com/' + APIPhoto.server + '/' + APIPhoto.id + '_' +
            APIPhoto.secret + '_b.jpg';
        photo.xlargeImageURL = 'http://farm' + APIPhoto.farm +
            '.staticflickr.com/' + APIPhoto.server + '/' + APIPhoto.id + '_' +
            APIPhoto.secret + '_h.jpg';
        // TODO: Figure out how to get k (which the actual page has...)
        /*
        photo.flickr_xxlargeImageURL =
            "http://c" + APIPhoto.farm + ".staticflickr.com/" + APIPhoto.farm +
            "/" + APIPhoto.server + "/" + APIPhoto.id + "_" + APIPhoto.secret +
            "_k.jpg";
        */

        // Some images don't allow a full download.
        if (APIPhoto.originalsecret) {
          photo.origImageURL = 'http://farm' + APIPhoto.farm +
              '.staticflickr.com/' + APIPhoto.server + '/' + APIPhoto.id + '_' +
              APIPhoto.originalsecret + '_o.jpg';
        }
      }

      photo.tags = APIPhoto.tags.tag.map(this.tagFromAPITag);

      // For debugging.
      photo.APIPhoto = APIPhoto;

      resolve(photo);
    });
  }
}
