'use strict';

var express = require('express');
var app = express();
var port = process.env.PORT || 8000;

// > Configuration
app.use(express.static(__dirname + '/client')); 


// API routes

var routes = require('./server/routes/routes');
routes(app);    // Register routes

// Application
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/main.html');
})

// otherwise ...
app.all('*', function(req, res) {
    res.redirect("/");
});
 
app.listen(port);
console.log("App listening on port " + port);
