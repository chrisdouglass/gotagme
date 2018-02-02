// Manages all API routes.

const express = require('express');
const router = express.Router();

// DB route for all of that good stuff.
const db = require('./db');
router.use('/db', db);

// The flickr API route wraps the flickr API.
const flickr = require('./flickr');
router.use('/flickr', flickr);

const user = require('./user');
router.use('/user', user);

module.exports = router;
