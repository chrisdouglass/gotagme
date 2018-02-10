const Photo = require('./photo.js');
const FlickrPhoto = require('../flickr/flickr_photo.js');

class PhotoBuilder {
  constructor(flickrPhotoResponse, postedByUser) {
    this.postedByUser = postedByUser;
    this.flickrPhoto = flickrPhotoResponse;
  }

  async build() {
    await this.verify();

    const photo = new Photo();
    photo.postedBy = this.postedByUser;
    photo.flickrPhoto = FlickrPhoto.fromFlickrAPIPhoto(this.flickrPhoto);
    return Promise.resolve(photo);
  }

  async verify() {
    return new Promise((resolve, reject) => {
      if (!this.postedByUser || !this.flickrPhoto) {
        reject(new Error('Photo failed verification.'));
        return;
      }

      resolve();
    });
  }
}

module.exports = PhotoBuilder;
