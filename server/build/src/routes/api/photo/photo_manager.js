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
var Photo = require('./photo.js');
var FlickrPhoto = require('../flickr/flickr_photo.js');
var PhotoBuilder = require('./photo_builder.js');
var FlickrFetcher = require('../flickr/flickr_fetcher.js');
var flickrFetcher = FlickrFetcher["default"](); // TODO: inject this?
/** Manages Photos in the database. */
var PhotoManager = /** @class */ (function () {
    function PhotoManager() {
    }
    /**
     * Inserts a new photo based on an Express request containing the data needed
     * for a new photo and saves the object if successful.
     * @param {express.Request} request - The request from which to obtain the
     *        data needed for a new photo. This function expects 'flickrURL' as
     *        part of the request body.
     * @return {Promise<Photo>} The new photo as inserted into the database.
     */
    PhotoManager.insertPhotoFromRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var user, flickrURL;
            return __generator(this, function (_a) {
                user = request.user;
                if (!user) {
                    throw this.errorWithMessageAndStatus('Not logged in.', 403);
                }
                flickrURL = request.body.flickrURL;
                return [2 /*return*/, flickrFetcher.photoByURL(flickrURL).then(function (APIPhoto) {
                        var builder = new PhotoBuilder(APIPhoto, user);
                        return builder.build();
                    }).then(this.savePhoto).then(this.populatePhoto)];
            });
        });
    };
    /**
     * Updates an existing photo based on an Express request containing the photo
     * and saves the object if successful.
     * @param {express.Request} request - The request from which to obtain the
     *        data needed for a new photo. This function expects 'id' as part of
     *        the request params and 'photo' as part of the request body.
     * @return {Promise<Photo>} The updated photo as saved in the database.
     */
    PhotoManager.updatePhotoFromRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var user, requestPhoto;
            return __generator(this, function (_a) {
                user = request.user;
                if (!user) {
                    throw this.errorWithMessageAndStatus('Not logged in.', 403);
                }
                requestPhoto = request.body.photo;
                if (!requestPhoto) {
                    throw this.errorWithMessageAndStatus('No photo provided.', 403);
                }
                if (!request.params.id) {
                    throw this.errorWithMessageAndStatus('No photoID provided.', 403);
                }
                // TODO: Actually implement photo updating.
                return [2 /*return*/, Photo.findOne({ photoID: request.params.id }).then(this.populatePhoto)];
            });
        });
    };
    /**
     * Gets an existing photo based on an Express request containing the photoID.
     * @param {express.Request} request - The request from which to obtain the
     *        data needed for a new photo. This function expects 'id' as part of
     *        the request params.
     * @return {Promise<Photo>} The photo.
     */
    PhotoManager.getPhotoFromRequest = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!request.params.id) {
                    throw this.errorWithMessageAndStatus('No photoID provided.', 403);
                }
                return [2 /*return*/, Photo.findOne({ photoID: request.params.id }).then(this.populatePhoto)];
            });
        });
    };
    PhotoManager.populatePhoto = function (photo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, Photo.populate(photo, {
                        path: "flickrPhoto postedBy"
                    })];
            });
        });
    };
    PhotoManager.savePhoto = function (photo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, photo.save()];
            });
        });
    };
    PhotoManager.errorWithMessageAndStatus = function (message, status) {
        var err = new Error(message);
        err.status = status;
        return err;
    };
    return PhotoManager;
}());
module.exports = PhotoManager;
