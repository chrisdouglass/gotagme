// Flickr API for photos.
const express = require('express');
const router = new express.Router();
const FlickrPhoto = require('./flickr_photo.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

/*
Example DB connection code.
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/myapp');
var conn = mongoose.connection;
*/

router.route('/url/').all(function(req, res, next) {
  if (!('flickrFetcher' in router)) {
    const err = new Error('flickrFetcher not set on photo router.');
    err.status = 500;
    next(err);
  }
  next();
}).get(function(req, res, next) {
  router.flickrFetcher.photoByURL(req.query.url).then(function(photo) {
    res.send(photo);
  }).catch(function(err) {
    res.status(500).json({error: err});
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

router.route('/id/').all(function(req, res, next) {
  if (!('flickrFetcher' in router)) {
    const err = new Error('flickrFetcher not set on photo router.');
    err.status = 500;
    next(err);
  }
  next();
}).get(function(req, res, next) {
  router.flickrFetcher.photoByID(req.query.id)
      .then(FlickrPhoto.fromFlickrAPIPhoto)
      .then(function(photo) {
        res.send(photo);
      }).catch(function(err) {
        res.status(500).json({error: err});
      });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
