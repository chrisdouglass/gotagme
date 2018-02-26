const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costumeSchema = new Schema({
  name: {
    type: String,
  },
  owners: {
    type: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  },
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
  // TODO: Uncomment with types.
  // currentOwner() {
  //   return this.owners[0];
  // }
}

costumeSchema.loadClass(CostumeClass);
// Exports mongoose model w/ class.
module.exports = mongoose.model('Costume', costumeSchema);
