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
var FlickrPhoto = require('./flickr_photo.js');
/** Builds FlickrPhotos. */
var FlickrPhotoBuilder = /** @class */ (function () {
    /**
     * @constructor
     * @param {dictionary} flickrPhotoResponse - The photo dictionary from flickr.
     */
    function FlickrPhotoBuilder(flickrPhotoResponse) {
        this.flickrPhoto = flickrPhotoResponse;
    }
    /**
     * Builds the FlickrPhoto.
     * @return {Promise<FlickrPhoto>} The built FlickrPhoto.
     */
    FlickrPhotoBuilder.prototype.build = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.verify_()) {
                    throw new Error('FlickrPhotoBuilder failed to verify.');
                }
                return [2 /*return*/, this.fromFlickrAPIPhoto(this.flickrPhoto)];
            });
        });
    };
    /**
     * Creates a flickr Photo from an photo dictionary response.
     * @param {dictionary} APIPhoto - The JSON dictionary returned by the flickr
     *        API.
     * @return {Promise<FlickrPhoto>} The built FlickrPhoto.
     */
    FlickrPhotoBuilder.prototype.fromFlickrAPIPhoto = function (APIPhoto) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var photo = new FlickrPhoto();
                        photo.id = APIPhoto.id;
                        photo.title = APIPhoto.title._content;
                        photo.description = APIPhoto.description._content;
                        photo.uploadDate = APIPhoto.dates.posted;
                        photo.captureDate = Date.parse(APIPhoto.dates.taken);
                        photo.owner = {
                            id: APIPhoto.owner.nsid,
                            username: APIPhoto.owner.path_alias,
                            displayName: APIPhoto.owner.username,
                            realName: APIPhoto.owner.realname
                        };
                        // TODO: make less fragile
                        photo.flickrPageURL = APIPhoto.urls.url[0]._content;
                        /*
                        https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
                          or
                        https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_[mstzb].jpg
                          or
                        https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{o-secret}_o.(jpg|gif|png)
                        s small square 75x75
                        q large square 150x150
                        t thumbnail, 100 on longest side
                        m small, 240 on longest side
                        n small, 320 on longest side
                        - medium, 500 on longest side
                        z medium 640, 640 on longest side
                        c medium 800, 800 on longest side†
                        b large, 1024 on longest side*
                        h large 1600, 1600 on longest side†
                        k large 2048, 2048 on longest side†
                        o original image, either a jpg, gif or png, depending on source format
                        * Before 5/25/2010 large photos only exist for very large original images.
                        † Medium 800, large 1600, and large 2048 photos only exist after 3/1/2012.
                        */
                        photo.smallImageURL =
                            'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
                                APIPhoto.server + '/' + APIPhoto.id + '_' + APIPhoto.secret +
                                '.jpg';
                        photo.mediumImageURL =
                            'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
                                APIPhoto.server + '/' + APIPhoto.id + '_' + APIPhoto.secret +
                                '_c.jpg';
                        photo.largeImageURL =
                            'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
                                APIPhoto.server + '/' + APIPhoto.id + '_' + APIPhoto.secret +
                                '_b.jpg';
                        photo.xlargeImageURL =
                            'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
                                APIPhoto.server + '/' + APIPhoto.id + '_' + APIPhoto.secret +
                                '_h.jpg';
                        // TODO: Figure out how to get k (which the actual page has...)
                        /*
                        photo.flickr_xxlargeImageURL =
                            "http://c" + APIPhoto.farm + ".staticflickr.com/" + APIPhoto.farm +
                            "/" + APIPhoto.server + "/" + APIPhoto.id + "_" + APIPhoto.secret +
                            "_k.jpg";
                        */
                        // Some images don't allow a full download.
                        if (APIPhoto.originalsecret) {
                            photo.origImageURL =
                                'http://farm' + APIPhoto.farm + '.staticflickr.com/' +
                                    APIPhoto.server + '/' + APIPhoto.id + '_' +
                                    APIPhoto.originalsecret + '_o.jpg';
                        }
                        photo.tags = APIPhoto.tags.tag.map(_this.tagFromAPITag);
                        // For debugging.
                        photo.APIPhoto = APIPhoto;
                        resolve(photo);
                    })];
            });
        });
    };
    /**
     * Creates a flickr Tag from an tag dictionary response.
     * @param {dictionary} APITag - The JSON dictionary returned by the flickr
     *        API.
     * @return {FlickrTag} A new FlickrTag initialized from the dictionary.
     */
    FlickrPhotoBuilder.prototype.tagFromAPITag = function (APITag) {
        // TODO: Make more space efficient by using a Tag entity.
        var tag = {};
        tag.tag = APITag._content;
        tag.displayName = APITag.raw;
        tag.userID = APITag.author;
        tag.userDisplayName = APITag.authorname;
        return tag;
    };
    FlickrPhotoBuilder.prototype.verify_ = function () {
        return (this.flickrPhoto);
    };
    return FlickrPhotoBuilder;
}());
module.exports = FlickrPhotoBuilder;
