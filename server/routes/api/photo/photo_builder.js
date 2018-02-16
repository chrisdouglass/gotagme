const Photo = require('./photo.js');
const FlickrPhoto = require('../flickr/flickr_photo.js');

class PhotoBuilder {
  constructor(flickrPhotoResponse, postedByUser) {
    this.postedByUser = postedByUser;
    this.flickrPhoto = flickrPhotoResponse;
  }

  async build() {
    return new Promise((resolve, reject) => {
      if (!this.verify_()) {
        reject(new Error('PhotoBuilder failed to verify.'));
        return;
      }

      const photo = new Photo();
      photo.postedBy = this.postedByUser._id;
      photo.flickrPhoto = FlickrPhoto.fromFlickrAPIPhoto(this.flickrPhoto);
      resolve(photo);
    });
  }

  verify_() {
    return (this.postedByUser && this.flickrPhoto);
  }
}

module.exports = PhotoBuilder;
