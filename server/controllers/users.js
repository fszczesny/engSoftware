'use strict';

var db = require('../db')

exports.getAllUsers = function(req, res) {
    res.send("Get all users");
}

exports.createUser = function(req, res) {
    res.send("Create user");
}


exports.getUser = function(req, res) {
    db.connection.end(function(err) {
        console.log("Connection end!");
    });
    res.send("Get user");
}

exports.updateUser = function(req, res) {
    res.send("Update user");
}

exports.deleteUser = function(req, res) {
    res.send("Delete user");
}


exports.logIn = function(req, res) {
    res.send("Log in");
}


