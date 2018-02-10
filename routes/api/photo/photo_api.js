// CRUD operations for Photos.
const FlickrFetcher = require('../flickr/flickr_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const Photo = require('./photo.js');
const PhotoBuilder = require('./photo_builder.js');
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
  if (!req.session.user) {
    const err = new Error('Not logged in.');
    err.status = 403;
    return next(err);
  }
  if (!req.body.url) {
    const err = new Error('Missing url parameter.');
    err.status = 500;
    return next(err);
  }

  const flickrFetcher = FlickrFetcher.default();
  flickrFetcher.photoByURL(req.body.url).then(function(APIPhoto, err) {
    if (err) {
      return err;
    }
    const builder = new PhotoBuilder(APIPhoto, req.session.user);
    return builder.build().then((photo) => photo.save());
  }).then((photo) => {
    res.json(photo);
  }).catch((err) => {
    next(err);
  });
}).delete(NotImplemented);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
