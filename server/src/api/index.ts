// Manages all API routes.

const express = require('express');
const router = new express.Router();

// Connect to MongoDB before loading any model classes.
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// TODO: Convert routes to use new TS models.
/*
const flickr = require('./flickr');
router.use('/flickr', flickr);

const user = require('./user');
router.use('/user', user);

const photo = require('./photo');
router.use('/photo', photo);
*/

module.exports = router;
