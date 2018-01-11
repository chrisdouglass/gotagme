var habitat = require('habitat');
habitat.load();
var env = new habitat('flickr');

var express = require('express');
var router = express.Router();

var Flickr = require('flickr-sdk');
var flickr = new Flickr(env.get('api_key'));

router.route('/search/:search_term').get(function(req, res, next) {
  flickr.photos.search({
    text: req.params.search_term,
    page: 1
  }).then(function (flickrres) {
    console.log(flickrres.body);
    res.send(flickrres);
  }).catch(function (err) {
    console.error('error while searching flickr', err);
    res.status(500).json({error: err});
  });
}).post(function(req, res, next) {
  res.sendStatus(403);
}).put(function(req, res, next) {
  res.sendStatus(403);
}).delete(function(req, res, next) {
  res.sendStatus(403);
});

router.use('/', function(req, res, next) {
  res.sendStatus(403);
});

module.exports = router;
