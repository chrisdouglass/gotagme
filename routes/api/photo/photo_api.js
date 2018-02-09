// CRUD operations for Photos.
const express = require('express');
const router = new express.Router();
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

router.route('/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  res.send();
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
