// CRUD operations for Photos.
const FlickrFetcher = require('../flickr/flickr_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const Photo = require('./photo.js');

const express = require('express');
const router = new express.Router();

router.route('/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  res.send();
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

router.route('/flickr/url').all(function(req, res, next) {
  next();
}).get(NotImplemented).post(NotImplemented).put(function(req, res, next) {
  const flickrFetcher = FlickrFetcher.default();
  flickrFetcher.fetchPhotoByURL(req.body.url, function(APIPhoto, err) {
    if (err) {
      next(err);
      return;
    }
    // TODO: Real user from session and insert into database.
    const user = null;
    const photo = Photo.fromAPIPhoto(APIPhoto);
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
