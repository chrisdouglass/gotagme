const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costumeSchema = new Schema({
  name: String,
  owners: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  photos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}],
});

/**
 * Represents a costume.
 * @alias Costume
 */
class CostumeClass {
  /**
   * Returns the most recent owner of this costume.
   * @return {User} - The current owner of this costume.
   */
  currentOwner() {
    return this.ownerList[0];
  }
}

costumeSchema.loadClass(CostumeClass);
// Exports mongoose model w/ class.
module.exports = mongoose.model('Costume', costumeSchema);
