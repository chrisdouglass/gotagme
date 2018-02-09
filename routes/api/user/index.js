// APIs for working with Users.

// const habitat = require('habitat');
// habitat.load();
// const env = new habitat('furtag');

const express = require('express');
const router = new express.Router();

const registerAPI = require('./register_api.js');
router.use('/register', registerAPI);

const user = require('./user_api.js');
router.use('/', user);

module.exports = router;
