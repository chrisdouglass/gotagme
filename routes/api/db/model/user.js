const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const costumeSchema = require('./user.js');

const userSchema = new Schema({
  accounts: {
    required: true,
    type: [accountSchema],
  },
  displayName: {
    type: String,
  },
  costumes: [costumeSchema],
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
   * @param {string} oauthToken - The token for searching.
   * @param {fetchUserCallback} callback
   */
  fetchUserForOAuthToken(oauthToken, callback) {
    // mongoose.
  }
}

userSchema.loadClass(UserClass);
const User = mongoose.model('User', userSchema);

module.exports = User;
