// Twitter API for users.
const express = require('express');
const router = new express.Router();
const TwitterFetcher = require('./twitter_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

const requestTokenMap = {}; // TODO: Worth moving to DB right?

router.route('/login/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  TwitterFetcher.fetchRequestTokens(
        function(requestToken, requestTokenSecret, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }
    requestTokenMap[requestToken] = requestTokenSecret;
    res.redirect(TwitterFetcher.getAuthUrl(requestToken));
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
