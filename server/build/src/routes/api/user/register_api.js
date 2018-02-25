// OAuth Registration API for users.
var express = require('express');
var router = new express.Router();
var TwitterFetcher = require('../twitter/twitter_fetcher.js');
var NotImplemented = require('../shared/init_tools.js').NotImplemented;
var User = require('./user.js');
var jwt = require('jsonwebtoken');
var requestTokenMap = {}; // TODO: Worth moving to DB right?
router.route('/').all(function (req, res, next) {
    next();
}).get(function (req, res, next) {
    TwitterFetcher.fetchRequestTokens(function (err, requestToken, requestTokenSecret) {
        if (err) {
            res.status(500).json({ error: err });
            return;
        }
        requestTokenMap[requestToken] = requestTokenSecret;
        res.redirect(TwitterFetcher.getAuthUrl(requestToken));
    });
}).post(NotImplemented).put(NotImplemented)["delete"](NotImplemented);
router.route('/reply/').all(function (req, res, next) {
    next();
}).get(function (req, res, next) {
    var requestToken = req.query.oauth_token;
    var requestTokenSecret = requestTokenMap[requestToken];
    if (!requestTokenSecret) {
        next(new Error('No cached request token secret for token', requestToken));
    }
    var verifier = req.query.oauth_verifier;
    TwitterFetcher.fetchAccessTokens(requestToken, requestTokenSecret, verifier, function (err, accessToken, accessTokenSecret) {
        if (err) {
            next(err);
            return;
        }
        User.upsertUserWithTokens(accessToken, accessTokenSecret, function (err, user) {
            if (err) {
                next(err);
            }
            else {
                res.json({
                    token: jwt.sign({ id: user.userID }, process.env.PASSPORT_JWT_SECRET, { expiresIn: '24h' })
                });
            }
        });
    });
}).post(NotImplemented).put(NotImplemented)["delete"](NotImplemented);
module.exports = router;