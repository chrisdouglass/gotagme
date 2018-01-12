// Manages all API routes.

const express = require('express');
const router = express.Router();

// The flickr API route wraps the flickr API.
const flickr = require('./flickr');
router.use('/flickr', flickr);

module.exports = router;
