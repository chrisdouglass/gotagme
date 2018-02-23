// Flickr API for photos.
const express = require('express');
const router = new express.Router();
const FlickrPhoto = require('./flickr_photo.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

router.route('/').all(function(req, res, next) {
  if (!('flickrFetcher' in router)) {
    const err = new Error('flickrFetcher not set on photo router.');
    err.status = 500;
    next(err);
  }
  next();
}).get(function(req, res, next) {
  let result;
  if (req.query.url) {
    result = router.flickrFetcher.photoByURL(req.query.url);
  } else {
    result = router.flickrFetcher.photoByID(req.query.id);
  }

  result.then(FlickrPhoto.fromFlickrAPIPhoto)
      .then(function(photo) {
        res.send(photo);
        return photo;
      }).catch(function(err) {
        res.status(500).json({error: err});
      });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
