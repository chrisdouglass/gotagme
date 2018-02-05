// API for fetching search results.
const express = require('express');
const router = new express.Router();

router.route('/:search_term').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }
  next();
}).get(function(req, res, next) {
  router.flickr.photos.search({
    text: req.params.search_term,
    page: 1,
  }).then(function(flickrres) {
    res.send(flickrres);
  }).catch(function(err) {
    console.error('error while searching flickr', err);
    res.status(500).json({error: err});
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
