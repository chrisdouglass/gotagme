// The twitter routes wrap the twitter API.
const express = require('express');
const router = new express.Router();

const user = require('./user_api.js');
router.use('/user', user);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
