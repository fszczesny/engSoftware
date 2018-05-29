'use strict';

var db = require('../db');
var dbConnection = db.connection;

var getUserById = function(userId, callback) {
    var sql = "SELECT * FROM users WHERE id = ?";
    dbConnection.query(sql, [userId], function (error, results, fields) {
        if (error) throw error;
        
        if (results.length > 0) {
            var userData = results[0];
            delete userData.password;
            if (typeof callback == 'function')
                callback(userData);
        } else {
            if (typeof callback == 'function')
                callback(null);
        }
    });
};

exports.signUp = function(req, res) {
    var userData = req.body;
    var sql = "INSERT users SET ?";

    dbConnection.query(sql, userData, function (error, results, fields) {
        if (error) throw error;

        // Load created userData
        var userId = results.insertId;
        getUserById(userId, function(userData) {
            res.json(userData);
        });
    });
}

exports.getUserById = function(req, res) {
    var userId = req.params.userId;
    getUserById(userId, function(userData) {
        res.json(userData);
    });
}


exports.updateUser = function(req, res) {
    res.send("Update user");
}

exports.deleteUser = function(req, res) {
    res.send("Delete user");
}


exports.logIn = function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT * FROM users WHERE username = ? AND password = ?";
    
    dbConnection.query(sql, [username, password], function (error, results, fields) {
        if (error) throw error;
        
        if (results.length > 0) {
            var userData = results[0];
            delete userData.password;
            res.json(userData);
        } else {
            res.json(null);
        }
    });
}

exports.checkExist = function(req, res) {
    var username = req.body.username;
    var sql = "SELECT * FROM users WHERE username = ?";
    
    dbConnection.query(sql, [username], function (error, results, fields) {
        if (error) throw error;
        
        if (results.length > 0) {
            res.json({ userExists: true });
        } else {
            res.json({ userExists: false });
        }
    });
}

exports.lookUpUser = function(req, res) {
    var username = req.body.username;
    var sql = "SELECT * FROM users WHERE username = ?";
    
    dbConnection.query(sql, [username], function (error, results, fields) {
        if (error) throw error;
        
        if (results.length > 0) {
            var userData = results[0];
            delete userData.password;
            res.json(userData);
        } else {
            res.json(null);
        }
    });
}
