// The flickr routes wrap the flickr API.
const express = require('express');
const router = new express.Router();

const photoAPI = require('./photo_api.js');
router.use('/', photoAPI);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
