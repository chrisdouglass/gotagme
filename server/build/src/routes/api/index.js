// Manages all API routes.
var express = require('express');
var router = new express.Router();
// Connect to MongoDB before loading any model classes.
var mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, { useMongoClient: true });
// DB route for all of that good stuff.
var db = require('./db');
router.use('/db', db);
// The flickr API route wraps the flickr API.
var flickr = require('./flickr');
router.use('/flickr', flickr);
var user = require('./user');
router.use('/user', user);
var photo = require('./photo');
router.use('/photo', photo);
module.exports = router;
