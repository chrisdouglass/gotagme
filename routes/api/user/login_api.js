// Twitter API for users.
const express = require('express');
const router = new express.Router();
const TwitterFetcher = require('../twitter/twitter_fetcher.js');
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const UserModel = require('../db/model/user.js');

const requestTokenMap = {}; // TODO: Worth moving to DB (session) right?

/**
 * Begin the registration flow for a new user.
 * This request stores a request secret locally and redirects to twitter.
 * @name Register User
 * @route {GET} /user/register
 */
router.route('/register').all(function(req, res, next) {
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

router.route('/login').all(function(req, res, next) {
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

    const accountArray =
        [{oauthAccessToken: accessToken, oauthAccessSecret: accessTokenSecret}];
    UserModel.create({accounts: accountArray},
        function(err, user) {
          if (err) next(err);
          res.json(user);
        });
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

// TODO: Remove in prod.
router.route('/all').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  UserModel.find({}, function(err, users) {
    const userMap = {};
    users.forEach(function(user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
}).post(NotImplemented).put(NotImplemented).delete(NotImplemented);

module.exports = router;
