// CRUD operations for Photos.
const express = require('express');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const BasicAuthenticate = require('../shared/init_tools.js').BasicAuthenticate;
const PhotoManager = require('./photo_manager.js');

const router = new express.Router();

function updatePhoto(req, res, next) {
  PhotoManager.updatePhotoFromRequest(req).then((photo) => {
    res.json(photo);
    return photo;
  }).catch(next);
}

/**
 * PUT API for adding a new Photo.
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {function} next
 */
function putPhoto(req, res, next) {
  PhotoManager.insertPhotoFromRequest(req).then((photo) => {
    res.json(photo);
    return photo;
  }).catch(next);
};

router.route('/')
    .get(NotImplemented)
    .post(BasicAuthenticate, updatePhoto)
    .put(BasicAuthenticate, putPhoto)
    .delete(NotImplemented);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
