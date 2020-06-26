/* Writen by Andre Benedito for uOttaHack2019 */

var express = require("express");
var fs = require('fs');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('mongoose-long')(mongoose);
var MongoStore = require('connect-mongo')(session);

const _path = __dirname; // + '/public/';

// mongoose.connect('mongodb+srv://andr-dev:9Pqhz5U3TiyS6eVX@business-webapp-ooehl.gcp.mongodb.net/test?retryWrites=true', {useCreateIndex: true, useNewUrlParser: true});
mongoose.connect('mongodb://localhost/budgetbuddy', {useCreateIndex: true, useNewUrlParser: true});
var db = mongoose.connection;
mongoose.set('useFindAndModify', false);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Mongoose Connected');
    // setupExpress();
    db.dropDatabase(function () {
        console.log('Reset MongoDB Database');
        setupExpress();
    });
});

app.use(session({
    secret: 'abcde12345_idk_uOttaHack2019', // This should be changed for security purposes!
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
        mongooseConnection: db
    })
}));

function setupExpress () {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(_path));
    const routes = require('./routes.js');
    app.use('/', routes);

    var port = 3000;

    app.listen(port, function () {
        console.log('Server started on port: ' + port);
    });
}