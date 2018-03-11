import {Photo} from 'flickr-sdk';
import * as mongoose from 'mongoose';

import {FlickrPhoto, FlickrPhotoDocument, flickrPhotoModelFactory, Owner} from '../model/photo/flickr_photo';

import {Store} from './store';

export class FlickrPhotoStore extends Store<FlickrPhotoDocument, FlickrPhoto> {
  constructor(connection: mongoose.Connection) {
    super(flickrPhotoModelFactory(connection), FlickrPhoto);
  }

  async fromFlickrAPIPhoto(apiPhoto: Photo): Promise<FlickrPhoto> {
    const photo: FlickrPhotoDocument = {} as FlickrPhotoDocument;
    if (!apiPhoto.id) {
      throw new Error('Flickr photo had no flickr ID.');
    }
    photo.flickrID = apiPhoto.id;
    photo.title = apiPhoto.title ? apiPhoto.title._content : '';
    photo.description =
        apiPhoto.description ? apiPhoto.description._content : '';
    if (apiPhoto.dateuploaded) {
      photo.uploadDate = +apiPhoto.dateuploaded;
    } else if (apiPhoto.dates && apiPhoto.dates.posted) {
      photo.uploadDate = Date.parse(apiPhoto.dates.posted);
    } else {
      // TODO: Log photo had no date.
    }
    photo.uploadDate = apiPhoto.dateuploaded ? +apiPhoto.dateuploaded : 0;
    if (apiPhoto.dates && apiPhoto.dates.taken) {
      photo.captureDate = Date.parse(apiPhoto.dates.taken);
    }
    if (apiPhoto.owner) {
      photo.owner = {
        nsid: apiPhoto.owner.nsid,
        username: apiPhoto.owner.path_alias || apiPhoto.owner.username,
        displayName: apiPhoto.owner.username,
        realName: apiPhoto.owner.realname,
      } as Owner;
    }

    if (apiPhoto.urls && apiPhoto.urls.url && apiPhoto.urls.url.length > 0) {
      photo.flickrPageURL = apiPhoto.urls.url[0]._content;
    } else {
      // TODO: log no url
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
    if (apiPhoto.farm && apiPhoto.server && apiPhoto.secret) {
      photo.smallImageURL = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '.jpg';
      photo.mediumImageURL = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '_c.jpg';
      photo.largeImageURL = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '_b.jpg';
      photo.xlargeImageURL = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '_h.jpg';
      // TODO: Figure out how to get k (which the actual page has...)
      /*
      photo.flickr_xxlargeImageURL =
          "http://c" + apiPhoto.farm + ".staticflickr.com/" + apiPhoto.farm +
          "/" + apiPhoto.server + "/" + apiPhoto.id + "_" + apiPhoto.secret +
          "_k.jpg";
      */

      // Some images don't allow a full download.
      if (apiPhoto.originalsecret) {
        photo.origImageURL = 'http://farm' + apiPhoto.farm +
            '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
            apiPhoto.originalsecret + '_o.jpg';
      }
    }

    photo.tags = apiPhoto.tags.tag.map(FlickrPhoto.tagFromAPITag);

    // For debugging.
    // photo.APIPhoto = apiPhoto;

    return await this.create(photo);
  }
}
