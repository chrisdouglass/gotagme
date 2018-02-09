const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Costume = require('./costume.js');

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

/**
 * Schema for representing individual users.
 * @constructor User
 */
const userSchema = new Schema({
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
 * Callback for fetching a User.
 * @callback fetchUserCallback
 * @param {error} err
 * @param {User} user
 */

/** Represents a User. */
class UserClass {
  /**
   * Gets an already registered user if it exists in the database.
   * @param {string} oauthAccessToken - The token to search.
   * @param {fetchUserCallback} callback
   */
  static fetchUserForOAuthToken(oauthAccessToken, callback) {
    User.findOne({'accounts.oauthAccessToken': oauthToken}, callback);
  }
}

userSchema.loadClass(UserClass);
const User = mongoose.model('User', userSchema);

module.exports = User;
