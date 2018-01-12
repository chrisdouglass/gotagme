// The flickr routes wrap the flickr API.

const habitat = require('habitat');
habitat.load();
const env = new habitat('flickr');

const express = require('express');
const router = express.Router();

const Flickr = require('flickr-sdk');
const flickr = new Flickr(env.get('api_key'));

const search = require('./search.js');
search.flickr = flickr;
router.use('/search', search);

const photo = require("./photo.js");
photo.flickr = flickr;
router.use('/photo', photo);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
