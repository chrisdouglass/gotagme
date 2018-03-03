// Manages all API routes.
import * as express from 'express';
const router = express.Router();

// Connect to MongoDB before loading any model classes.
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {useMongoClient: true});

// User management and registration.
const user = require('./user');
router.use('/user', user);

// TODO: Convert routes to use new TS models.
/*
const flickr = require('./flickr');
router.use('/flickr', flickr);

const photo = require('./photo');
router.use('/photo', photo);
*/

module.exports = router;
