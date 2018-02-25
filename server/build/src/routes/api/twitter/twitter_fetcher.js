var OAuth = require('oauth');
var oauth = new OAuth.OAuth('https://api.twitter.com/oauth/request_token', 'https://api.twitter.com/oauth/access_token', process.env.TWITTER_CONSUMER_KEY, process.env.TWITTER_CONSUMER_SECRET, '1.0A', process.env.TWITTER_DEV_CALLBACK, // TODO: Support prod/dev.
'HMAC-SHA1');
/** Provides access to Twitter. */
var TwitterFetcher = /** @class */ (function () {
    /**
     * @constructor
     * @param {string} accessToken - The user's accessToken or null if unauth'd.
     * @param {string} accessTokenSecret - The user's accessTokenSecret or null if
     *        unauth'd.
     */
    function TwitterFetcher(accessToken, accessTokenSecret) {
        this.accessToken = accessToken;
        this.accessTokenSecret = accessTokenSecret;
    }
    // TODO: Move auth methods into an object which does auth.
    /**
     * Callback type for tokens.
     * @callback twitterTokenCallback
     * @param {error} err
     * @param {string} token
     * @param {string} tokenSecret
     */
    /**
     * Gets client request tokens for starting the OAuth process. This token
     * should be used in a redirect to the Twitter OAuth URL available from
     * getAuthUrl().
     * @param {twitterTokenCallback} callback - The token handler.
     */
    TwitterFetcher.fetchRequestTokens = function (callback) {
        oauth.getOAuthRequestToken(function (error, oauthToken, oauthTokenSecret, results) {
            if (error) {
                callback(error, null, null);
            }
            else {
                callback(null, oauthToken, oauthTokenSecret);
            }
        });
    };
    /**
     * Gets access tokens from a request token and Twitter OAuth verifier. These
     * values are obtained from Twitter's OAuth response callback.
     * Access tokens are the keys to a user's twitter account.
     * @param {string} requestToken - The request token (oauth_token).
     * @param {string} requestTokenSecret - The request token secret.
     * @param {string} twitterOAuthVerifier - The oauth_verifier string.
     * @param {twitterTokenCallback} callback - The token handler.
     */
    TwitterFetcher.fetchAccessTokens = function (requestToken, requestTokenSecret, twitterOAuthVerifier, callback) {
        oauth.getOAuthAccessToken(requestToken, requestTokenSecret, twitterOAuthVerifier, function (error, accessToken, accessTokenSecret, results) {
            if (error) {
                callback(error, null, null);
            }
            else {
                callback(null, accessToken, accessTokenSecret);
            }
        });
    };
    /**
     * Gets the URL to redirect to for OAuth authentication.
     * @param {string} requestToken - The request token (oauth_token).
     * @return {string} The URL to redirect.
     */
    TwitterFetcher.getAuthUrl = function (requestToken) {
        return 'https://api.twitter.com/oauth/authenticate?oauth_token=' +
            requestToken;
    };
    return TwitterFetcher;
}());
module.exports = TwitterFetcher;
