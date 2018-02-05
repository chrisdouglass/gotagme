// Manages all routes.

const express = require('express');
const router = new express.Router();

// All API routes.
const api = require('./api');
router.use('/api', api);

router.use('/', function(req, res) {
  res.render('index', {title: 'Hey', message: 'Hello there!'});
});

module.exports = router;
