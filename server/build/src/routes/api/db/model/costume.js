var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var costumeSchema = new Schema({
    name: {
        type: String
    },
    owners: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
});
/**
 * Represents a costume.
 * @alias Costume
 */
var CostumeClass = /** @class */ (function () {
    function CostumeClass() {
    }
    /**
     * Returns the most recent owner of this costume.
     * @return {User} - The current owner of this costume.
     */
    CostumeClass.prototype.currentOwner = function () {
        return this.owners[0];
    };
    return CostumeClass;
}());
costumeSchema.loadClass(CostumeClass);
// Exports mongoose model w/ class.
module.exports = mongoose.model('Costume', costumeSchema);
