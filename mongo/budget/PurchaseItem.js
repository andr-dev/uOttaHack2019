var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var bcrypt = require('bcrypt');

var Long = mongoose.Schema.Types.Long;

var PurchaseItemSchema = new mongoose.Schema({
    cost: {
        type: Decimal128,
        required: true,
    },
    type: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    datePurchased: {
        type: Long,
        required: true,
    },
    dateCreated: {
        type: Long,
        required: true,
    }
});

var PurchaseItem = mongoose.model('user', PurchaseItemSchema);

module.exports = PurchaseItem;