const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

/** Schema for representing a single photo in the service. */
const photoSchema = new Schema({
  _id: {
    type: String,
    default: shortid.generate,
  },
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  takenBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  costumes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Costume'}],
  // TODO: Remove this dependency.
  flickrPhoto: {type: mongoose.Schema.Types.ObjectId, ref: 'FlickrPhoto'},
}, {_id: false}); // Don't generate the normal default id.

/**
 * Represents a photo from any source.
 * @alias Photo
 */
class PhotoClass {

}

schema.loadClass(PhotoClass);
// Exports mongoose model w/ class.
module.exports = db.model('Photo', photoSchema);
