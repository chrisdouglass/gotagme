import {Photo} from 'flickr-sdk';
import * as mongoose from 'mongoose';
import {Url} from 'url';

import {FlickrOwner, FlickrPhoto, FlickrPhotoDocument, flickrPhotoModel} from '../model/photo';

import {Store} from './store';

export class FlickrPhotoStore extends Store<FlickrPhotoDocument, FlickrPhoto> {
  constructor(connection: mongoose.Connection) {
    super(flickrPhotoModel(connection), FlickrPhoto);
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
      photo.captureDate = new Date(Date.parse(apiPhoto.dates.taken));
    }

    if (apiPhoto.owner) {
      photo.owner = {
        nsid: apiPhoto.owner.nsid,
        username: apiPhoto.owner.path_alias || apiPhoto.owner.username,
        displayName: apiPhoto.owner.username,
        realName: apiPhoto.owner.realname,
      } as FlickrOwner;
    }

    if (apiPhoto.urls && apiPhoto.urls.url && apiPhoto.urls.url.length > 0) {
      photo.flickrPageUrl = apiPhoto.urls.url[0]._content;
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
      photo.smallImageUrl = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '.jpg';
      photo.mediumImageUrl = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '_c.jpg';
      photo.largeImageUrl = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '_b.jpg';
      photo.xlargeImageUrl = 'http://farm' + apiPhoto.farm +
          '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
          apiPhoto.secret + '_h.jpg';
      // TODO: Figure out how to get k (which the actual page has...)
      /*
      photo.flickr_xxlargeImageUrl =
          "http://c" + apiPhoto.farm + ".staticflickr.com/" + apiPhoto.farm +
          "/" + apiPhoto.server + "/" + apiPhoto.id + "_" + apiPhoto.secret +
          "_k.jpg";
      */

      // Some images don't allow a full download.
      if (apiPhoto.originalsecret) {
        photo.origImageUrl = 'http://farm' + apiPhoto.farm +
            '.staticflickr.com/' + apiPhoto.server + '/' + apiPhoto.id + '_' +
            apiPhoto.originalsecret + '_o.jpg';
      }
    }

    // TODO: Handle album photos with a string as their tags.
    if (apiPhoto.tags.tag) {
      photo.tags = apiPhoto.tags.tag.map(FlickrPhoto.tagFromAPITag);
    }

    // For debugging.
    // photo.APIPhoto = apiPhoto;

    return await this.create(photo);
  }

  /**
   * Finds a FlickrPhoto using the provided Url.
   * @param flickrPageUrl The Url of the image to find.
   */
  async findOneByFlickrPageUrl(flickrPageUrl: Url): Promise<FlickrPhoto|null> {
    const byUrl: FlickrPhoto|null =
        await this.findOne({flickrPageUrl: flickrPageUrl.href});
    if (byUrl) {
      return byUrl;
    }
    // Guess the ID and match by that.
    try {
      const ID: string|undefined =
          flickrPageUrl.href && flickrPageUrl.href.split('/')[5];
      return !ID ? null : await this.findOneByFlickrID(ID);
    } catch (err) {
      return null;
    }
  }

  /**
   * Returns the photo matching the provided ID if it exists.
   * @param flickrID The flickr ID to search.
   */
  async findOneByFlickrID(flickrID: string): Promise<FlickrPhoto|null> {
    return this.findOne({
      flickrID,
    });
  }
}
