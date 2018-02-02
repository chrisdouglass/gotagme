class FlickrTag {
  static tagFromAPITag(APITag) {
    const tag = new FlickrTag();
    tag.tag = APITag._content;
    tag.display_tag = APITag.raw;
    tag.user_id = APITag.author;
    tag.user_display_name = APITag.authorname;
    return tag;
  }
}

module.exports = FlickrTag;
