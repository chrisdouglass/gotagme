// Flickr API for photosets.
var express = require('express');
var router = new express.Router();
var NotImplemented = require('../shared/init_tools.js').NotImplemented;
router.route('/').all(function (req, res, next) {
    if (!('flickrFetcher' in router)) {
        var err = new Error('flickrFetcher not set on photo router.');
        err.status = 500;
        next(err);
    }
    next();
}).get(function (req, res, next) {
    router.flickrFetcher.fetchAlbumContentsByIDAndUserID(req.query.photoset_id, req.query.user_id, function (photos, err) {
        if (err) {
            next(err);
            return;
        }
        res.send(photos);
    });
}).post(NotImplemented).put(NotImplemented)["delete"](NotImplemented);
module.exports = router;
