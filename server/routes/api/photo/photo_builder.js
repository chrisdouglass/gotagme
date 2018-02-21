const Photo = require('./photo.js');
const FlickrPhoto = require('../flickr/flickr_photo.js');
const FlickrPhotoBuilder = require('../flickr/flickr_photo_builder.js');

/** Builds Photos. */
class PhotoBuilder {
  /**
   * @constructor
   * @param {dictionary} flickrPhotoResponse - The photo dictionary from flickr.
   * @param {User} postedByUser - The user object for the poster.
   */
  constructor(flickrPhotoResponse, postedByUser) {
    this.flickrPhoto = flickrPhotoResponse;
    this.postedByUser = postedByUser;
  }

  /**
   * Builds the Photo.
   * @return {Promise<FlickrPhoto>} The built FlickrPhoto.
   */
  async build() {
    if (!this.verify_()) {
      throw new Error('PhotoBuilder failed to verify.');
    }

    const flickrBuilder = new FlickrPhotoBuilder(this.flickrPhoto);
    return flickrBuilder.build().then((flickrPhoto) => {
      return flickrPhoto.save();
    }).then((flickrPhoto) => {
      const photo = new Photo();
      photo.postedBy = this.postedByUser._id;
      photo.flickrPhoto = flickrPhoto._id;
      return photo;
    });
  }

  verify_() {
    return (this.postedByUser && this.flickrPhoto);
  }
}

module.exports = PhotoBuilder;
