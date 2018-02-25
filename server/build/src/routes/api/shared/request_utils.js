/** Utility class for working with {express.Request}. */
var RequestUtils = /** @class */ (function () {
    function RequestUtils() {
    }
    /**
     * Verifies the specified parameters are found in the request parameters dict.
     * @param {string[]} paramsToVerify - The parameters for which to check.
     * @param {dictionary} requestParamsDict - The dictionary of request params.
     * @return {boolean} true if every parameter is found, false if not or if
     *         either value is null.
     */
    RequestUtils.verifyParametersContainsParameters = function (paramsToVerify, requestParamsDict) {
        if (!paramsToVerify || !requestParamsDict) {
            return false;
        }
        for (var _i = 0, paramsToVerify_1 = paramsToVerify; _i < paramsToVerify_1.length; _i++) {
            var parameter = paramsToVerify_1[_i];
            if (!paramsToVerify[parameter]) {
                // TODO: Consider returning the missing parameters.
                console.log('Missing parameter:', parameter);
                return false;
            }
        }
        return true;
    };
    return RequestUtils;
}());
// TODO: Turn this into a proper module.
module.exports = RequestUtils;
