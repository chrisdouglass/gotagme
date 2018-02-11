// CRUD operations for Photos.
const express = require('express');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const PhotoManager = require('./photo_manager.js');

const router = new express.Router();

/**
 * PUT API for adding a new Photo.
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {function} next
 */
function putPhoto(req, res, next) {
  if (!req.session.user) {
    const err = new Error('Not logged in.');
    err.status = 403;
    return next(err);
  }
  if (!req.body.flickrURL) {
    const err = new Error('Missing flickrURL parameter.');
    err.status = 500;
    return next(err);
  }

  PhotoManager.insertPhotoFromRequest(req).then((photo) => {
    res.json(photo);
    return photo;
  }).catch(next);
};

router.route('/').get(NotImplemented).post(NotImplemented).put(NotImplemented)
    .delete(NotImplemented);

router.route('/flickr/url').get(NotImplemented).post(NotImplemented)
    .put(putPhoto).delete(NotImplemented);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
