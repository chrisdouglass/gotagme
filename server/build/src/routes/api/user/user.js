var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var shortid = require('shortid');
var Costume = require('../db/model/costume.js');
/**
 * Embedded schema for representing oauth accounts.
 * @constructor Account
 */
var accountSchema = new Schema({
    oauthAccessToken: {
        required: true,
        type: String
    },
    oauthAccessSecret: {
        required: true,
        type: String
    },
    displayName: {
        type: String
    },
    username: {
        type: String
    }
});
/** Schema for representing individual users. */
var userSchema = new Schema({
    // _id shouldn't be overridden because it's used for referencing.
    userID: {
        type: String,
        "default": shortid.generate
    },
    accounts: {
        required: true,
        type: [accountSchema]
    },
    displayName: {
        type: String
    },
    costumes: [Costume.schema]
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
var UserClass = /** @class */ (function () {
    function UserClass() {
    }
    /**
     * Gets an already registered user if it exists in the database.
     * @param {string} oauthAccessToken - The OAuth token.
     * @param {string} oauthAccessSecret - The OAuth secret.
     * @param {userCallback} callback
     */
    UserClass.userWithOAuthTokens = function (oauthAccessToken, oauthAccessSecret, callback) {
        User.findOne({
            'accounts.oauthAccessToken': oauthAccessToken,
            'accounts.oauthAccessSecret': oauthAccessSecret
        }, callback);
    };
    /**
     * Upserts a user and calls back with the upserted result.
     * @param {string} oauthAccessToken - The OAuth token.
     * @param {string} oauthAccessSecret - The OAuth secret.
     * @param {userCallback} callback
     */
    UserClass.upsertUserWithTokens = function (oauthAccessToken, oauthAccessSecret, callback) {
        var user = User.userWithOAuthTokens(oauthAccessToken, oauthAccessSecret);
        if (user) {
            callback(null, user);
        }
        var account = { 'oauthAccessToken': oauthAccessToken,
            'oauthAccessSecret': oauthAccessSecret };
        var accountArray = [account];
        User.create({ accounts: accountArray }, callback);
    };
    return UserClass;
}());
userSchema.loadClass(UserClass);
var User = mongoose.model('User', userSchema);
module.exports = User;
