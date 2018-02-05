// Flickr API for photosets.
const express = require('express');
const router = new express.Router();
const FlickrFetcher = require('./flickr_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

router.route('/id/').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    console.log(err);
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(function(req, res, next) {
  req.flickrFetcher.fetchAlbumContentsByIDAndUserID(
    req.query.photoset_id, req.query.user_id, function(photos, err) {
    if (err) {
      res.status(500).json({error: err});
      // console.log(err);
      return;
    }

    res.send(photos);
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
