// APIs for working with Users.
// const habitat = require('habitat');
// habitat.load();
// const env = new habitat('furtag');
var express = require('express');
var router = new express.Router();
var registerAPI = require('./register_api.js');
router.use('/register', registerAPI);
var user = require('./user_api.js');
router.use('/', user);
module.exports = router;
