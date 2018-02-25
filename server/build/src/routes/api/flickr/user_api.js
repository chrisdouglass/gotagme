// Flickr API for users.
var express = require('express');
var router = new express.Router();
var NotImplemented = require('../shared/init_tools.js').NotImplemented;
router.route('/findid/').all(function (req, res, next) {
    if (!('flickrFetcher' in router)) {
        var err = new Error('flickr property was not set on photo router.');
        err.status = 500;
        next(err);
    }
    next();
}).get(function (req, res, next) {
    var callback = function (userID, err) {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        res.send(userID);
    };
    router.flickrFetcher.getUserIDFromUsername(req.query.username, callback);
}).post(NotImplemented).put(NotImplemented)["delete"](NotImplemented);
module.exports = router;
