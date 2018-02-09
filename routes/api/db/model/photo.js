const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema for representing a single photo in the service.
 * @constructor Photo
 */
const photoSchema = new Schema({
  postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  takenBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  costumes: [{type: mongoose.Schema.Types.ObjectId, ref: 'Costume'}],
});

/**
 * Represents a photo from any source.
 */
class PhotoClass {

}

schema.loadClass(PhotoClass);
// Exports mongoose model w/ class.
module.exports = db.model('Photo', photoSchema);
