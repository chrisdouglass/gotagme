// The flickr routes wrap the flickr API.
var express = require('express');
var router = new express.Router();
var photoAPI = require('./photo_api.js');
router.use('/', photoAPI);
// Make every other request a 403.
router.use('/', function (req, res, next) {
    var err = new Error('Not Allowed');
    err.status = 403;
    next(err);
});
module.exports = router;
