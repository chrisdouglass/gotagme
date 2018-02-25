var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var Flickr = require('flickr-sdk');
/** Wraps the Flickr SDK's API. */
var FlickrFetcher = /** @class */ (function () {
    /**
     * @constructor
     * @param {flickr-sdk.Flickr} flickrSDK - An instance of the flickr SDK API
     *        object or null if the default credentials should be used.
     */
    function FlickrFetcher(flickrSDK) {
        this.flickrSDK = flickrSDK;
    }
    /**
     * Returns a new fetcher using the default API key.
     * @return {FlickrFetcher} A new default API key fetcher.
     */
    FlickrFetcher["default"] = function () {
        return FlickrFetcher.fromAPIKey(process.env.FLICKR_API_KEY);
    };
    /**
     * Returns a new fetcher using the given flickr API key.
     * @param {string} APIKey - The key to use for authentication.
     * @return {FlickrFetcher} A new fetcher using the provided key.
     */
    FlickrFetcher.fromAPIKey = function (APIKey) {
        return new FlickrFetcher(new Flickr(APIKey));
    };
    /**
     * Fetches the flickr photo with the given flickr ID.
     * @param {string} ID - The ID of the photo to fetch.
     * @return {Promise<dictionary>} The flickr API photo dictionary response.
     */
    FlickrFetcher.prototype.photoByID = function (ID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.flickrSDK.photos.getInfo({
                        photo_id: ID
                    }).then(function (flickrres) {
                        return flickrres.body.photo;
                    })];
            });
        });
    };
    /**
     * Fetches the flickr photo located at the given flickr.com URL.
     * @param {string} URL - A flickr.com URL of the form:
     *        https://www.flickr.com/photos/kirkstauffer/38906051605/in/pool-95408233@N00
     * @return {Promise<dictionary>} The flickr API photo dictionary response.
     */
    FlickrFetcher.prototype.photoByURL = function (URL) {
        return __awaiter(this, void 0, void 0, function () {
            var ID;
            return __generator(this, function (_a) {
                try {
                    ID = URL.split('/')[5];
                }
                catch (err) {
                    throw new Error('Unable to obtain an ID from URL.');
                }
                return [2 /*return*/, this.photoByID(ID)];
            });
        });
    };
    /**
     * Fetches the contents of a flickr photo album.
     * @param {string} ID - The photo album's ID.
     * @param {string} userID - flickr's partial-numerical userID for the owner.
     *        of the album. Should be in the form #######@X##. (ex: 8036590@N05)
     * @return {Promise<[dictionary]>} The array of API photo dictionaries.
     */
    FlickrFetcher.prototype.albumContentsByIDAndUserID = function (ID, userID) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.flickrSDK.photosets.getPhotos({
                        photoset_id: ID,
                        user_id: userID,
                        extras: 'tags,url_o,url_m,url_s,url_t,media'
                    })];
            });
        });
    };
    /**
     * Fetches flickr's partial-numerical userID for a given textual username.
     * @param {string} username - The username to query.
     * @return {Promise<string>} The userID for the username provided.
     */
    FlickrFetcher.prototype.userIDFromUsername = function (username) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.flickrSDK.people.findByUsername({
                        username: username
                    }).then(function (flickrres) {
                        return flickrres.body.user.id;
                    })];
            });
        });
    };
    return FlickrFetcher;
}());
module.exports = FlickrFetcher;
