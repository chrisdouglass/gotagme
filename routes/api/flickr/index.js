// The flickr routes wrap the flickr API.

const habitat = require('habitat');
habitat.load();
const env = new habitat('flickr');

const express = require('express');
const router = express.Router();

const Flickr = require('flickr-sdk');
const flickr = new Flickr("");

const search = require('./search.js');
search.flickr = flickr;
router.use('/search', search);

const photoAPI = require("./photo_api.js");
photoAPI.flickr = flickr;
router.use('/photo', photoAPI);

const photosetAPI = require("./photoset_api.js");
photosetAPI.flickr = flickr;
router.use('/photoset', photosetAPI);

const userAPI = require("./user_api.js");
userAPI.flickr = flickr;
router.use('/user', userAPI);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
