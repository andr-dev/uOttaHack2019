var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var bcrypt = require('bcrypt');

var Long = mongoose.Schema.Types.Long;

var passMinLength = 8;
var passMaxLength = 64;

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    accountType: {
        type: Boolean,
        required: true,
    },
    name_first: {
        type: String,
        required: true,
    },
    name_last: {
        type: String,
        required: true,
    },
    dateCreated: {
        type: Long,
        required: true,
    },
    account: {
        budget: {
            type: Number,
            requried: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        purchaseTypeList: [{
            type: String,
            required: true,
            trim: true,
        }],
        purchaseHistory: [{
            description: {
                type: String,
                required: false,
                trim: true,
            },
            cost: {
                type: Number,
                required: true,
            },
            purchaseType: {
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
            },
        }],
    },
});

userSchema.path('password').validate(function(psw) {
    return psw && (psw.length >= passMinLength && psw.length <= passMaxLength);
}, 'Password must be at least ' + passMinLength + ' characters long and less than ' + passMaxLength + ' characters in length.');

// AUTHENTICATE
userSchema.statics.authenticate = function (email, password, callback) {
    user.findOne({email : email}).exec(function (err, userAcc) {
        if (err) {
            return callback(err)
        } else if (!userAcc) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        bcrypt.compare(password, userAcc.password, function (err, result) {
            if (result === true) {
                return callback(null, userAcc, userAcc.type);
            } else {
                return callback();
            }
        })
    });
}

// HASH BEORE SAVING
userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        console.log('Created user with password [%s]', user.password);
        next();
    })
});

var user = mongoose.model('user', userSchema);

module.exports = user;