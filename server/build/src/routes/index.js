// Manages all routes.
var express = require('express');
var router = new express.Router();
// All API routes.
var api = require('./api');
router.use('/api', api);
router.use('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' });
});
module.exports = router;
