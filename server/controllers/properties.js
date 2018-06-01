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

exports.getAvailables = function(req, res) {
    var sql = "SELECT p.*, (r.rentId IS NOT NULL) as isRent FROM properties AS p ";
    sql += "LEFT JOIN rents AS r ON ";
    sql += "(p.id = r.propertyId) AND (CURDATE() BETWEEN r.startDate AND r.endDate) ";
    sql += "GROUP BY p.id HAVING isRent = 0 AND p.sold = 0";
    
    dbConnection.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};

exports.getPropertyById = function(req, res) {
    var propertyId = req.params.propertyId;
    var sql = "SELECT p.*, (r.rentId IS NOT NULL) as isRent FROM properties AS p ";
    sql += "LEFT JOIN rents AS r ON ";
    sql += "(p.id = r.propertyId) AND (CURDATE() BETWEEN r.startDate AND r.endDate) ";
    sql += "WHERE p.id = ? LIMIT 1";
    
    dbConnection.query(sql, [propertyId], function (error, results, fields) {
        if (error) throw error;
        res.json(results[0]);
    });
};



// > Rents

exports.loadRents = function(req, res) {
    var propertyId = req.params.propertyId;
    var sql = "SELECT * FROM rents WHERE propertyId = ?";

    dbConnection.query(sql, [propertyId], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};

exports.newRent = function(req, res) {
    var rentData = req.body;
    var sql = "INSERT rents SET ?";
    dbConnection.query(sql, rentData, function (error, results, fields) {
        if (error) throw error;

        res.json({ rentId: results.insertId })
    });
}



