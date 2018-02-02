// Flickr API for photosets.
const router = require('express').Router();
const FlickrFetcher = require('./flickr_fetcher.js');

router.route("/id/").all(function(req, res, next) {
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

module.exports = router;
