// CRUD operations for Users
const express = require('express');
const router = new express.Router();
const NotImplemented = require('../shared/init_tools.js').NotImplemented;
const User = require('./user.js');
const RequestUtils = require('../shared/request_utils.js');

router.route('/').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  const id = req.query.user_id;
  if (!id) {
    const err = new Error('No ID in request');
    err.status = 400;
    next(err);
    return;
  }
  User.findOne({'id': id}, (err, user) => {
    if (err) {
      console.log(err);
      next(err);
    }
    res.send(user);
  });
}).put(function(req, res, next) {
  if (!RequestUtils.verifyParametersContainsParameters(
        ['oauthAccessToken', 'oauthAccessSecret'], req.body)) {
    const err = new Error('Missing required parameter');
    err.status = 400;
    next(err);
    return;
  }

  User.create({
      accounts: [
        {
          oauthAccessToken: req.body.oauth_access_token,
          oauthAccessSecret: req.body.oauth_access_secret,
        },
      ],
  },
  function(err, user) {
    if (err) {
      next(err);
      return;
    };
    res.json(user);
  });
}).post(NotImplemented).delete(NotImplemented);

router.route('/all').all(function(req, res, next) {
  next();
}).get(function(req, res, next) {
  User.find({}, function(err, users) {
    const userMap = {};
    users.forEach(function(user) {
      console.log(user);
      userMap[user._id] = user;
    });
    res.send(userMap);
  });
}).put(NotImplemented).post(NotImplemented).delete(NotImplemented);


// Make every other request a 403.
router.use('/', function(req, res, next) {
  const err = new Error('Not Allowed');
  err.status = 403;
  next(err);
});

module.exports = router;
