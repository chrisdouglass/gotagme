const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let costumeSchema = new Schema({
  name: String,
  // author: String,
  // body:   String,
  // comments: [{ body: String, date: Date }],
  // date: { type: Date, default: Date.now },
  // hidden: Boolean,
  // meta: {
  //   votes: Number,
  //   favs:  Number
  // }
});

/**
 * Represents a costume.
 */
class CostumeClass {

}

schema.loadClass(CostumeClass);
// Exports mongoose model w/ class.
module.exports = db.model('Costume', costumeSchema);
