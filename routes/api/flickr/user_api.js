// Flickr API for users.
const router = require('express').Router();
const FlickrFetcher = require('./flickr_fetcher.js');

router.route('/findid/').all(function(req, res, next) {
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

module.exports = router;
