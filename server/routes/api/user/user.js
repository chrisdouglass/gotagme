const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const Costume = require('../db/model/costume.js');

/**
 * Embedded schema for representing oauth accounts.
 * @constructor Account
 */
const accountSchema = new Schema({
  oauthAccessToken: {
    required: true,
    type: String,
  },
  oauthAccessSecret: {
    required: true,
    type: String,
  },
  displayName: {
    type: String,
  },
  username: {
    type: String,
  },
});

/** Schema for representing individual users. */
const userSchema = new Schema({
  // _id shouldn't be overridden because it's used for referencing.
  userID: {
    type: String,
    default: shortid.generate,
  },
  accounts: {
    required: true,
    type: [accountSchema],
  },
  displayName: {
    type: String,
  },
  costumes: [Costume.schema],
});

/**
 * User function callbacks
 * @callback userCallback
 * @param {error} err
 * @param {User} user
 */

/**
 * Represents a User.
 * @alias User
 */
class UserClass {
  /**
   * Gets an already registered user if it exists in the database.
   * @param {string} oauthAccessToken - The OAuth token.
   * @param {string} oauthAccessSecret - The OAuth secret.
   * @param {userCallback} callback
   */
  static userWithOAuthTokens(
      oauthAccessToken, oauthAccessSecret, callback) {
    User.findOne({
      'accounts.oauthAccessToken': oauthAccessToken,
      'accounts.oauthAccessSecret': oauthAccessSecret,
    }, callback);
  }

  /**
   * Upserts a user and calls back with the upserted result.
   * @param {string} oauthAccessToken - The OAuth token.
   * @param {string} oauthAccessSecret - The OAuth secret.
   * @param {userCallback} callback
   */
  static upsertUserWithTokens(oauthAccessToken, oauthAccessSecret, callback) {
    const user =
        User.userWithOAuthTokens(oauthAccessToken, oauthAccessSecret);
    if (user) {
      callback(null, user);
    }

    const account = {'oauthAccessToken': oauthAccessToken,
                     'oauthAccessSecret': oauthAccessSecret};
    const accountArray = [account];
    User.create({accounts: accountArray}, callback);
  }
}

userSchema.loadClass(UserClass);
const User = mongoose.model('User', userSchema);

module.exports = User;
