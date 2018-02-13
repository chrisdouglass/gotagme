// The flickr routes wrap the flickr API.
const express = require('express');
const router = new express.Router();

const flickrFetcher = require('./flickr_fetcher.js').default();

const search = require('./search.js');
search.flickrFetcher = flickrFetcher;
router.use('/search', search);

const photoAPI = require('./photo_api.js');
photoAPI.flickrFetcher = flickrFetcher;
router.use('/photo', photoAPI);

const photosetAPI = require('./photoset_api.js');
photosetAPI.flickrFetcher = flickrFetcher;
router.use('/photoset', photosetAPI);

const userAPI = require('./user_api.js');
userAPI.flickrFetcher = flickrFetcher;
router.use('/user', userAPI);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
