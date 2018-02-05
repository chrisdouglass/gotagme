const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  userType: {
    required: true,
    type: String,
    enum: ['TWITTER'],
    // for validation:
    // required: function() {
    //   return someBool;
    // }
  },

  displayName: {
    required: true,
    type: String,
  },

  // {user_id}
  twitterLogin: {
    type: Object,
  },
});

/**
 * Represents a User.
 */
class UserClass {

}

schema.loadClass(UserClass);
const User = mongoose.model('User', schema);

module.exports = User;
