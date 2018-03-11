import {StringAnyMap} from '../../common/types';

/** Utility class for working with {express.Request}. */
export class RequestUtils {
  /**
   * Verifies the specified parameters are found in the request parameters dict.
   * @param paramsToVerify - The parameters for which to check.
   * @param requestParamsDict - The dictionary of request params.
   * @return true if every parameter is found, false if not or if either value
   * is null.
   */
  static verifyParametersContainsParameters(
      paramsToVerify: string[], requestParamsDict: StringAnyMap) {
    if (!paramsToVerify || !requestParamsDict) {
      return false;
    }

    for (const parameter of paramsToVerify) {
      if (!requestParamsDict[parameter]) {
        // TODO: Consider returning the missing parameters.
        console.log('Missing parameter:', parameter);
        return false;
      }
    }
    return true;
  }
}
