// Flickr API for photosets.
const express = require('express');
const router = new express.Router();
const TwitterFetcher = require('./twitter_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;

router.route('/login/').all(function(req, res, next) {
  req.twitterFetcher = new TwitterFetcher();
  next();
}).get(function(req, res, next) {
  req.twitterFetcher.fetchRequestToken(function(requestToken, err) {
    if (err) {
      res.status(500).json({error: err});
      return;
    }

    res.redirect('https://api.twitter.com/oauth/authenticate?oauth_token=' +
        requestToken);
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
