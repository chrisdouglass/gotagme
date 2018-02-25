/** Represents a tag on the flickr service. */
var FlickrTag = /** @class */ (function () {
    function FlickrTag() {
    }
    /**
     * Creates a flickr Tag from an tag dictionary response.
     * @param {dictionary} APITag - The JSON dictionary returned by the flickr
     *        API.
     * @return {FlickrTag} A new FlickrTag initialized from the dictionary.
     */
    FlickrTag.tagFromAPITag = function (APITag) {
        var tag = new FlickrTag();
        tag.tag = APITag._content;
        tag.display_tag = APITag.raw;
        tag.user_id = APITag.author;
        tag.user_display_name = APITag.authorname;
        return tag;
    };
    return FlickrTag;
}());
module.exports = FlickrTag;
