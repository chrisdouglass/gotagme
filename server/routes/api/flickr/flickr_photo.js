const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const flickrPhotoSchema = new Schema({
  id: String,
  title: String,
  description: String,
  uploadDate: Date,
  captureDate: Date,
  owner: {
    id: String,
    username: String,
    displayName: String,
    realName: String,
  },
  flickrPageURL: String,
  smallImageURL: String,
  mediumImageURL: String,
  largeImageURL: String,
  xlargeImageURL: String,
  origImageURL: String,
  tags: [{
    tag: String,
    displayName: String,
    userID: String,
    userDisplayName: String,
  }],
});

/**
 * Represents a photo on the flickr service.
 * @alias FlickrPhoto
 */
class FlickrPhotoClass {
  /**
   * Creates a flickr Photo from an photo dictionary response.
   * @param {dictionary} APIPhoto - The JSON dictionary returned by the flickr
   *        API.
   * @return {FlickrPhoto} A new FlickrPhoto initialized from the dictionary.
   */
  static fromFlickrAPIPhoto(APIPhoto) {
    const photo = new FlickrPhoto();
    photo.id = APIPhoto.id;
    photo.title = APIPhoto.title._content;
    photo.description = APIPhoto.description._content;
    photo.uploadDate = APIPhoto.dates.posted;
    photo.captureDate = Date.parse(APIPhoto.dates.taken);
    photo.owner = {
      id: APIPhoto.owner.nsid,
      username: APIPhoto.owner.path_alias,
      displayName: APIPhoto.owner.username,
      realName: APIPhoto.owner.realname,
    };

    // TODO: make less fragile
    photo.flickrPageURL = APIPhoto.urls.url[0]._content;

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
    photo.smallImageURL =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '.jpg';
    photo.mediumImageURL =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '_c.jpg';
    photo.largeImageURL =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '_b.jpg';
    photo.xlargeImageURL =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '_h.jpg';
    // TODO: Figure out how to get k (which the actual page has...)
    /*
    photo.flickr_xxlargeImageURL =
        "http://c" + APIPhoto.farm + ".staticflickr.com/" + APIPhoto.farm +
        "/" + APIPhoto.server + "/" + APIPhoto.id + "_" + APIPhoto.secret +
        "_k.jpg";
    */

    // Some images don't allow a full download.
    if (APIPhoto.originalsecret) {
      photo.origImageURL =
          'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
          APIPhoto.server + '/' + APIPhoto.id + '_' + APIPhoto.originalsecret +
          '_o.jpg';
    }

    photo.tags = APIPhoto.tags.tag.map(FlickrPhoto.tagFromAPITag);

    // For debugging.
    photo.APIPhoto = APIPhoto;

    return photo;
  }

  /**
   * Creates a flickr Tag from an tag dictionary response.
   * @param {dictionary} APITag - The JSON dictionary returned by the flickr
   *        API.
   * @return {FlickrTag} A new FlickrTag initialized from the dictionary.
   */
  static tagFromAPITag(APITag) {
    // TODO: Make more space efficient by using a Tag entity.
    const tag = {};
    tag.tag = APITag._content;
    tag.displayName = APITag.raw;
    tag.userID = APITag.author;
    tag.userDisplayName = APITag.authorname;
    return tag;
  }
}

flickrPhotoSchema.loadClass(FlickrPhotoClass);
// Exports mongoose model w/ class.
const FlickrPhoto = mongoose.model('FlickrPhoto', flickrPhotoSchema);
module.exports = FlickrPhoto;
