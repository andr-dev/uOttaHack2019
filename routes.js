const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const request = require('request');

const user = require('./mongo/user.js');

const _path = __dirname + '/views/';
const _path_login = _path + 'login.html';
const _path_dashboard = _path + 'dashboard.html';
const _path_profile = _path + 'profile.html';
const _path_reports = _path + 'reports.html';
const _path_expenses = _path + 'reports.html';

createUser('bobross', 'bobross@gmail.com', 'thepainter', true, 'Bob', 'Ross');

router.post('/login', function (req, res, next) {
    if (req.body.email && req.body.password) {
        user.authenticate(req.body.email, req.body.password, function (err, userLog) {
            console.log(err);
            console.log(userLog);
            if (err || !userLog) {
                req.session.retry = true;
                res.redirect('/');
            } else {
                console.log('AUTH : User [%s] authenticated successfully', userLog.username);
                console.log(userLog._id);
                req.session.userId = userLog._id;
                res.redirect('/dashboard');
            }
        });
    } else {
        res.send('Email or password missing.');
    }
});

router.get('/', (req, res, next) => {
    res.sendFile(_path_login);
});

router.get('/dashboard', (req, res) => {
    authenticate(req.session.userId, (err, accType) => {
        if (!err) {
            if (accType != null) { // fix depending on user
                res.sendFile(_path_dashboard);
            } else {
                console.log('AUTH : User unauthorized');
                res.redirect('/');
            }
        } else {
            res.send('Internal Server Error');
        }
    });
});

router.get('/profile', (req, res) => {
    authenticate(req.session.userId, (err, accType) => {
        if (!err) {
            if (accType != null) { // fix depending on user
                res.sendFile(_path_profile);
            } else {
                console.log('AUTH : User unauthorized');
                res.redirect('/');
            }
        } else {
            res.send('Internal Server Error');
        }
    });
});

router.get('/reports', (req, res) => {
    authenticate(req.session.userId, (err, accType) => {
        if (!err) {
            if (accType != null) { // fix depending on user
                res.sendFile(_path_reports);
            } else {
                console.log('AUTH : User unauthorized');
                res.redirect('/');
            }
        } else {
            res.send('Internal Server Error');
        }
    });
});

router.get('/expenses', (req, res) => {
    authenticate(req.session.userId, (err, accType) => {
        if (!err) {
            if (accType != null) { // fix depending on user
                res.sendFile(_path_expenses);
            } else {
                console.log('AUTH : User unauthorized');
                res.redirect('/');
            }
        } else {
            res.send('Internal Server Error');
        }
    });
});

function authenticate (userId, callback) {
    user.findById(userId).exec(function (error, userLog) {
        if (error) {
            console.log('AUTH : Error searching for userId [%s]', userId);
            callback(null);
        } else {
            if (userLog === null) {
                callback(null);
            } else {
                console.log('AUTH : user [%s] authorized', userLog.username);
                callback(null, userLog.accountType);
            }
        }
    });
    return null;
}

function createUser (username, email, password, accountType, name_first, name_last) {
    const now = Math.round((new Date()).getTime() / 1000);

    console.log('THIIIIIIIIIIIIIIIIIIING');

    var purchaseHistory = [];

    for (var i = 0; i < 1000; i++) {
        purchaseHistory[i] = {
            description: 'a singular krispy kreme dunut',
            cost: getRandomInt(100),
            purchaseType: 'food',
            datePurchased: 1549750000 + i*10,
            dateCreated: now,
        }
    }

    const userThing = {
        username: username,
        email: email,
        password: password,
        accountType: accountType,
        name_first: name_first,
        name_last: name_last,
        dateCreated: now,
        account: {
            balance: 1.23,
            purchaseHistory: purchaseHistory,
        }
    };

    user.create(userThing, function (err, userAcc) {
        if (err) {
            console.log(err)
        } else {
            console.log('MONGODB : User [%s] created', username);
            console.log(userAcc.name_first);
        }
    });
}

// API

router.get('/data/expenses', (req, res) => {
    authenticate(req.session.userId, (err, accType) => {
        if (!err) {
            if (accType != null) {
                getDataExpenses(req.session.userId, function (data) {
                    res.send(data);
                });
            } else {
                console.log('AUTH : User unauthorized');
                res.redirect('/');
            }
        } else {
            res.send('Internal Server Error');
        }
    });
});

function getDataExpenses (userId, callback) {
    user.findById(userId).exec(function (error, userLog) {
        if (error) {
            console.log('AUTH : Error searching for userId [%s]', userId);
            callback(null);
        } else {
            if (userLog === null) {
                callback(null);
            } else {
                var out = [];

                for (var i = 0; i < userLog.account.purchaseHistory.length; i++) {
                    var item = userLog.account.purchaseHistory[i];
                    // console.log(item);
                    out[i] = {
                        x: item.datePurchased,
                        y: item.cost
                    };
                }

                callback(out);
            }
        }
    });
}

// 5c5f6dbb0f23d0505c125942

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

router.get('*', (req, res) => {
    res.redirect('/dashboard');
});

module.exports = router;

/*

income
food
entertainment
rent
utility
savings
personal

for each
- budget - double
- expenses to date - double

 */