const habitat = require('habitat');
habitat.load();
const env = habitat('twitter');

const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: env.consumerKey,
  consumer_secret: env.consumerSecret,
  bearer_token: env.consumerSecret,
  access_token_key: env.accessTokenKey,
  access_token_secret: env.accessTokenSecret,
});

/** Provides access to Twitter. */
class TwitterFetcher {
  /**
   * Callback type for token callbacks.
   * @callback twitterTokenCallback
   * @param {string} token
   * @param {error} err
   */

  /**
   * Gets a client request token for starting the OAuth process.
   * @param {twitterTokenCallback} callback - The token handler.
   */
  fetchRequestToken(callback) {
    client.getRequestToken(function(err, requestToken, requestSecret) {
      if (err) {
        callback(null, err);
      } else {
        callback(requestToken, null);
      }
    });
  }
}

module.exports = TwitterFetcher;
