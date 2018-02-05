const FlickrTag = require('./flickr_tag.js');

/** Represents a photo on the flickr service. */
class FlickrPhoto {
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
    photo.upload_date = APIPhoto.dates.posted;
    photo.capture_date = Date.parse(APIPhoto.dates.taken);
    photo.owner = {
      id: APIPhoto.owner.nsid,
      username: APIPhoto.owner.path_alias,
      display_name: APIPhoto.owner.username,
      real_name: APIPhoto.owner.realname,
    };

    // TODO: make less fragile
    photo.flickr_page_url = APIPhoto.urls.url[0]._content;

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
    photo.small_image_url =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '.jpg';
    photo.medium_image_url =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '_c.jpg';
    photo.large_image_url =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '_b.jpg';
    photo.xlarge_image_url =
        'http://farm' + APIPhoto.farm + '.staticflickr.com/' + APIPhoto.server +
        '/' + APIPhoto.id + '_' + APIPhoto.secret + '_h.jpg';
    // TODO: Figure out how to get k (which the actual page has...)
    /*
    photo.flickr_xxlarge_image_url =
        "http://c" + APIPhoto.farm + ".staticflickr.com/" + APIPhoto.farm +
        "/" + APIPhoto.server + "/" + APIPhoto.id + "_" + APIPhoto.secret +
        "_k.jpg";
    */

    // Some images don't allow a full download.
    if (APIPhoto.originalsecret) {
      photo.orig_image_url =
          'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
          APIPhoto.server + '/' + APIPhoto.id + '_' + APIPhoto.originalsecret +
          '_o.jpg';
    }

    photo.tags = APIPhoto.tags.tag.map(FlickrTag.tagFromAPITag);

    // For debugging.
    photo.APIPhoto = APIPhoto;

    return photo;
  }
}

module.exports = FlickrPhoto;
