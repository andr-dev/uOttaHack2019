var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
require('mongoose-double')(mongoose);
var bcrypt = require('bcrypt');

var Long = mongoose.Schema.Types.Long;
var Double = mongoose.Schema.Types.Double;

var UserAccountSchema = new mongoose.Schema({
    cost: {
        type: String,
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

var UserAccount = mongoose.model('UserAccount', UserAccountSchema);

module.exports = UserAccount;