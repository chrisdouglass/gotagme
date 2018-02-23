// CRUD operations for Photos.
const express = require('express');
const InitTools = require('../shared/init_tools.js');
const NotImplemented = InitTools.NotImplemented;
const BasicAuthenticate = InitTools.BasicAuthenticate;
const PhotoManager = require('./photo_manager.js');

const router = new express.Router();

/**
 * POST API for modifying a Photo.
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {function} next
 */
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

/**
 * GET API for getting a Photo.
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {function} next
 */
function getPhoto(req, res, next) {
  PhotoManager.getPhotoFromRequest(req).then((photo) => {
    res.json(photo);
    return photo;
  }).catch(next);
};

router.route('/:id')
    .get(getPhoto)
    .post(BasicAuthenticate, updatePhoto)
    .put(NotImplemented)
    .delete(BasicAuthenticate, NotImplemented);

router.route('/')
    .get(NotImplemented)
    .post(NotImplemented)
    .put(BasicAuthenticate, putPhoto)
    .delete(NotImplemented);

// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
