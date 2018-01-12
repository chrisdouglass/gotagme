// API for fetching a photo.

const router = require('express').Router();

router.route('/:id').all(function(req, res, next) {
  if (!('flickr' in router)) {
    const err = new Error('flickr property was not set on photo router.');
    err.status = 500;
    next(err);
  }
  next();
}).get(function(req, res, next) {
  router.flickr.photos.getInfo({
    photo_id: req.params.id
  }).then(function (flickrres) {
    console.log(flickrres.body);
    res.send(flickrres);
  }).catch(function (err) {
    console.error('error while fetching an image from flickr', err);
    res.status(500).json({error: err});
  });
}).post(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).put(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
}).delete(function(req, res, next) {
  const err = new Error('Not Implemented');
  err.status = 501;
  next(err);
});

module.exports = router;
