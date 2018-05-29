'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var AWS = require('aws-sdk');
var mysqlConnect = require('./server/db');

var app = express();
var port = process.env.PORT || 8000;

// > Configuration
app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded({ 'extended' : 'true' }));        // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// > API routes

var coreRoutes = require('./server/routes/core');
var userRoutes = require('./server/routes/users');
var propertyRoutes = require('./server/routes/properties');
// Register routes
coreRoutes(app);
userRoutes(app);
propertyRoutes(app);

// > Application

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/main.html');
})

// otherwise ...
app.all('*', function(req, res) {
    res.redirect("/");
});
 
app.listen(port);
console.log("App listening on port " + port);

// Register routes
userRoutes(app);
propertyRoutes(app);

// > Application

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/main.html');
})

// otherwise ...
app.all('*', function(req, res) {
    res.redirect("/");
});
 
app.listen(port);
console.log("App listening on port " + port);
