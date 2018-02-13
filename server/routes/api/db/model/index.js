// The flickr routes wrap the twitter API.

// const habitat = require('habitat');
// habitat.load();
// const env = new habitat('twitter');

const express = require('express');
const router = new express.Router();

// const login = require('./user_api.js');
// router.use('/user', login);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
