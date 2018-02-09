// Twitter API for users.
const express = require('express');
const router = new express.Router();

router.route('/').all(function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
