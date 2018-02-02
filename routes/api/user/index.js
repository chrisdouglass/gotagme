// APIs for working with Users.

const habitat = require('habitat');
habitat.load();
const env = new habitat('furtag');

const express = require('express');
const router = express.Router();

/* Example import:
const foo = require('./foo.js');
router.use('/foo', foo);
*/

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
