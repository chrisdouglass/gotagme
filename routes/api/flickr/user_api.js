// Flickr API for users.
const express = require('express');
const router = new express.Router();
const FlickrFetcher = require('./flickr_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

router.route('/findid/').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }

  req.flickrFetcher = new FlickrFetcher(router.flickr);
  next();
}).get(function(req, res, next) {
  const callback = function(userID, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }

    res.send(userID);
  };
  req.flickrFetcher.getUserIDFromUsername(req.query.username, callback);
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
