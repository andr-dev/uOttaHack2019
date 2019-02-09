const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const request = require('request');

const user = require('./mongo/user.js');

const _path = __dirname + '/views/';
const _path_login = _path + '/login.html';
const _path_admin = _path + '/dashboard.html';

createUser('bobross', 'bobross@gmail.com', 'thepainter', true, 'Bob', 'Ross');

router.get('/', (req, res, next) => {
    res.sendFile(_path_login);
});

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
                req.session.userId = userLog._id;
                res.redirect(_path_admin);
            }
        });
    } else {
        res.send('Email or password missing.');
    }
});

function authenticate (userId, callback) {
    user.findById(userId).exec(function (error, userLog) {
        if (error) {
            console.log('AUTH : Error searching for userId [%s]', userId);
            callback(null);
        } else {
            if (userLog === null) {
                console.log('AUTH : User unauthorized');
                callback(null);
            } else {
                console.log('AUTH : user [%s] authorized', userLog.username);
                callback(userLog.accountType);
            }
        }
    });
    return null;
}

function createUser (username, email, password, accountType, name_first, name_last) {
    const now = Math.round((new Date()).getTime() / 1000);

    const acc = {
        username: username,
        email: email,
        password: password,
        accountType: accountType,
        name_first: name_first,
        name_last: name_last,
        dateCreated: now,
    };

    user.create(acc, function (err, userAcc) {
        if (err) {
            console.log(err)
        } else {
            console.log('MONGODB : User [%s] created', username);
            console.log(userAcc.name_first);
        }
    });
}


module.exports = router;