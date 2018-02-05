const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({

});

/**
 * Represents a photo from any source.
 */
class PhotoClass {

}

schema.loadClass(PhotoClass);
// Exports mongoose model w/ class.
module.exports = db.model('Photo', photoSchema);
