const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  oauth_access_token: String,
  oauth_access_seceet: String,
  name: String,
  username: String,
});

const costumeSchema = require('./user.js');

const userSchema = new Schema({
  accounts: {
    required: true,
    type: [accountSchema],
    validate: function() {
      return accountSchema.length >= 1;
    },
  },
  displayName: {
    required: true,
    type: String,
  },
  costumes: [costumeSchema],
});

/**
 * Represents a User.
 */
class UserClass {

}

userSchema.loadClass(UserClass);
const User = mongoose.model('User', userSchema);

module.exports = User;
