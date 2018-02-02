const FlickrPhoto = require('./flickr_photo.js');

class FlickrFetcher {
  constructor(flickrSDK) {
    this.flickrSDK = flickrSDK;
  }

  // callback signature should be function(Photo, error)
  fetchPhotoByID(ID, callback) {
    this.flickrSDK.photos.getInfo({
      photo_id: ID
    }).then(function (flickrres) {
      callback(FlickrPhoto.fromFlickrAPIPhoto(flickrres.body.photo), null);
    }).catch(function (err) {
      console.log(err);
      callback(null, err);
    });
  }

  // callback signature should be function(Photo, error)
  fetchPhotoByURL(URL, callback) {
    // ex: https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
    // param: http%3A%2F%2Fflickr.com%2Fphotos%2Fkirkstauffer%2F38906051605%2Fin%2Fpool-95408233@
    const ID = URL.split('/')[5];
    this.fetchPhotoByID(ID, callback);
  }

  // callback signature should be function(Array of Photos, error)
  // userID is the numerical user identifier such as 8036590@N05
  // TODO: Consider moving to a seperate endpoint?
  fetchAlbumContentsByIDAndUserID(ID, userID, callback) {
    this.flickrSDK.photosets.getPhotos({
      photoset_id: ID,
      user_id: userID,
      extras: "tags,url_o,url_m,url_s,url_t,media",
    }).then(function (flickrres) {
      callback(flickrres, null);
    }).catch(function (err) {
      callback(null, err);
    });
  }

  // callback signature should be function(string, error)
  // TODO: Obviously move this out of here.
  getUserIDFromUsername(username, callback) {
    this.flickrSDK.people.findByUsername({
      username: username,
    }).then(function (flickrres) {
      callback(flickrres.body.user.id, null);
    }).catch(function (err) {
      callback(null, err);
    });
  }
}

module.exports = FlickrFetcher;
