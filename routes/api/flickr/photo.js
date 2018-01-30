// API for fetching a photo.

class Photo {
  static fromFlickrAPIPhoto(APIPhoto) {
    const photo = new Photo();
    photo.id = APIPhoto.id;
    photo.flickr_title = APIPhoto.title._content;
    photo.flickr_description = APIPhoto.description._content;
    photo.flickr_upload_date = APIPhoto.dates.posted;
    photo.flickr_capture_date = Date.parse(APIPhoto.dates.taken);
    photo.flickr_owner = {
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
    */
    photo.flickr_image_url = "http://farm" + APIPhoto.farm + ".staticflickr.com/" + APIPhoto.server + "/" + APIPhoto.id + "_" + APIPhoto.secret + ".jpg";
    photo.flickr_orig_image_url = "http://farm" + APIPhoto.farm + ".staticflickr.com/" + APIPhoto.server + "/" + APIPhoto.id + "_" + APIPhoto.originalsecret + "_o.jpg";

    photo.flickr_tags = APIPhoto.tags.tag.map(Tag.tagFromAPITag);

    // For debugging.
    photo.APIPhoto = APIPhoto;

    return photo;
  }
}

class Tag {
  static tagFromAPITag(APITag) {
    const tag = new Tag();
    tag.tag = APITag._content;
    tag.display_tag = APITag.raw;
    tag.user_id = APITag.author;
    tag.user_display_name = APITag.authorname;
    return tag;
  }
}

class FlickrFetcher {
  constructor(flickrSDK) {
    this.flickrSDK = flickrSDK;
  }

  // callback signature should be function(Photo, error)
  fetchPhotoByID(ID, callback) {
    router.flickr.photos.getInfo({
      photo_id: ID
    }).then(function (flickrres) {
      callback(Photo.fromFlickrAPIPhoto(flickrres.body.photo), null);
    }).catch(function (err) {
      callback(null, err);
    });
  }

  // callback signature should be function(Photo, error)
  fetchPhotoByURL(URL, callback) {
    // ex: https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
    // param: http%3A%2F%2Fflickr.com%2Fphotos%2Fkirkstauffer%2F38906051605%2Fin%2Fpool-95408233@
    const ID = URL.split('/')[5];
    this.fetchByID(ID, callback);
  }

  // callback signature should be function(Array of Photos, error)
  // userID is the numerical user identifier such as 8036590@N05
  // TODO: Consider moving to a seperate endpoint?
  fetchAlbumContentsByIDAndUserID(ID, userID, callback) {
    router.flickr.photosets.getPhotos({
      photoset_id: ID,
      user_id: userID,
      extras: "tags,url_o,url_s,media",
    }).then(function (flickrres) {
      callback(flickrres, null);
    }).catch(function (err) {
      callback(null, err);
    });
  }

  // callback signature should be function(string, error)
  // TODO: Obviously move this out of here.
  getUserIDFromUsername(username, callback) {
    router.flickr.people.findByUsername({
      username: username,
    }).then(function (flickrres) {
      callback(flickrres.body.user.id, null);
    }).catch(function (err) {
      callback(null, err);
    });
  }
}

const router = require('express').Router();

router.route('/byusername/').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(function(req, res, next) {
  req.flickrFetcher.getUserIDFromUsername(req.query.username, function(userID, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }

    res.send(userID);
  });
}).post(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).put(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).delete(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
});

router.route('/byurl/').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(function(req, res, next) {
  req.flickrFetcher.fetchPhotoByURL(req.query.url, function(photo, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }

    res.send(photo);
  });
}).post(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).put(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).delete(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
});

router.route("/photoset/").all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(function(req, res, next) {
  console.log(req.query);
  req.flickrFetcher.fetchAlbumContentsByIDAndUserID(
    req.query.photoset_id, req.query.user_id, function(photos, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }

    res.send(photos);
  });
});

router.route('/byid/').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(function(req, res, next) {
  req.flickrFetcher.fetchPhotoByID(req.query.id, function(photo, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }

    res.send(photo);
  });
}).post(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).put(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).delete(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
});

module.exports = router;
