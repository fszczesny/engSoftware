'use strict';

exports.createUser = function(req, res) {
    res.send("Create user");
}

exports.logIn = function(req, res) {
    res.send("Log in");
}

exports.getAll = function(req, res) {
    res.send("Get all users");
}