var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
require('mongoose-double')(mongoose);
var bcrypt = require('bcrypt');

var Long = mongoose.Schema.Types.Long;
var Double = mongoose.Schema.Types.Double;

var UserAccountSchema = new mongoose.Schema({
    balance: {
        type: Double,
        default: 0.00,
        required: true,
    },
    purchaseHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_account_purchaseitem',
        required: true,
    }],
});

var UserAccount = mongoose.model('user_account', UserAccountSchema);

module.exports = UserAccount;