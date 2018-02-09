// CRUD operations for Photos.
const express = require('express');
const router = new express.Router();
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const Photo = require('../db/model/photo.js'); // TODO: Move to api/photo.
const FlickrPhoto = require('../flickr/flickr_photo.js');
const FlickrFetcher = require('../flickr/flickr_fetcher.js');
const Flickr = require('flickr-sdk');

router.flickr = new Flickr(process.env.FLICKR_API_KEY);

router.route('/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  res.send();
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

router.route('/flickr/url').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(NotImplemented).post(NotImplemented).put(function(req, res, next) {
  req.flickrFetcher.fetchPhotoByURL(req.body.url, function(APIPhoto, err) {
    if (err) {
      next(err);
      return;
    }
    const flickrPhoto = FlickrPhoto.fromFlickrAPIPhoto(APIPhoto);
    // TODO: Real user and insert into database.
    const user = null;
    const photo = new Photo(user, flickrPhoto);
    res.json(photo);
  });
}).delete(NotImplemented);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
