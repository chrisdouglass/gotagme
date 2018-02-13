// OAuth Registration API for users.
const express = require('express');
const router = new express.Router();
const TwitterFetcher = require('../twitter/twitter_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const User = require('./user.js');

const requestTokenMap = {}; // TODO: Worth moving to DB right?

router.route('/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  TwitterFetcher.fetchRequestTokens(
        function(err, requestToken, requestTokenSecret) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }
    requestTokenMap[requestToken] = requestTokenSecret;
    res.redirect(TwitterFetcher.getAuthUrl(requestToken));
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

router.route('/reply/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  const requestToken = req.query.oauth_token;
  const requestTokenSecret = requestTokenMap[requestToken];
  if (!requestTokenSecret) {
    next(new Error('No cached request token secret for token', requestToken));
  }
  const verifier = req.query.oauth_verifier;

  TwitterFetcher.fetchAccessTokens(requestToken, requestTokenSecret, verifier,
        function(err, accessToken, accessTokenSecret) {
    if (err) {
      next(err);
      return;
    }

    User.upsertUserWithTokens(
        accessToken, accessTokenSecret, function(err, user) {
      if (err) {
        next(err);
      } else {
        req.session.user = user;
        res.json(user);
      }
    });
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
