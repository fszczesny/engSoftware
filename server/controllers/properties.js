'use strict';

var db = require('../db');
var dbConnection = db.connection;

var updateUserType = function(ownerId, callback) {
    var sql = "UPDATE users SET userType = 'Owner' WHERE id = ?";
    dbConnection.query(sql, [ownerId], function (error, results, fields) {
        if (error) throw error;
        
        if (typeof callback == 'function')
            callback();
    });
};

exports.insertProperty = function(req, res) {
    var propertyInfo = req.body;
    var ownerId = propertyInfo.ownerId;

    var sql = "INSERT properties SET ?";
    dbConnection.query(sql, propertyInfo, function (error, results, fields) {
        if (error) throw error;

        // Will also update userType (Customer -> Owner) if needed
        updateUserType(ownerId);
        res.json({ propertyId: results.insertId })
    });
};

exports.getAll = function(req, res) {
    var sql = "SELECT * FROM properties WHERE sold = 0";
    
    dbConnection.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};