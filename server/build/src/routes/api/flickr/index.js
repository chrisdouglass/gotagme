// The flickr routes wrap the flickr API.
var express = require('express');
var router = new express.Router();
var flickrFetcher = require('./flickr_fetcher.js')["default"]();
var search = require('./search.js');
search.flickrFetcher = flickrFetcher;
router.use('/search', search);
var photoAPI = require('./photo_api.js');
photoAPI.flickrFetcher = flickrFetcher;
router.use('/photo', photoAPI);
var photosetAPI = require('./photoset_api.js');
photosetAPI.flickrFetcher = flickrFetcher;
router.use('/photoset', photosetAPI);
var userAPI = require('./user_api.js');
userAPI.flickrFetcher = flickrFetcher;
router.use('/user', userAPI);
// Make every other request a 403.
router.use('/', function (req, res, next) {
    var err = new Error('Not Allowed');
    err.status = 403;
    next(err);
});
module.exports = router;
