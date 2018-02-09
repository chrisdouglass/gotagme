/** Utility class for working with {express.Request}. */
class RequestUtils {
  /**
   * Verifies the specified parameters are found in the request parameters dict.
   * @param {string[]} paramsToVerify - The parameters for which to check.
   * @param {dictionary} requestParamsDict - The dictionary of request params.
   * @return {boolean} true if every parameter is found, false if not or if
   *         either value is null.
   */
  static verifyParametersContainsParameters(paramsToVerify, requestParamsDict) {
    if (!paramsToVerify || !requestParamsDict) {
      return false;
    }

    for (let parameter of paramsToVerify) {
      if (!paramsToVerify[parameter]) {
        // TODO: Consider returning the missing parameters.
        console.log('Missing parameter:', parameter);
        return false;
      }
    }
    return true;
  }
}

// TODO: Turn this into a proper module.
module.exports = RequestUtils;
