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
    var sql = "SELECT * FROM properties WHERE sold = 0 AND reserved = 0";
    
    dbConnection.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};

exports.getAvailables = function(req, res) {
    var sql = "SELECT p.*, (r.rentId IS NOT NULL) as isRent FROM properties AS p ";
    sql += "LEFT JOIN rents AS r ON ";
    sql += "(p.id = r.propertyId) AND (CURDATE() BETWEEN r.startDate AND r.endDate) ";
    sql += "GROUP BY p.id HAVING isRent = 0 AND p.sold = 0 AND p.reserved = 0";
    
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

// > Reservations

exports.newReservation = function(req, res) {
    var reservationData = req.body;
    
    // Insert propertyReservations table
    var sql1 = "INSERT propertyReservations SET ?";
    dbConnection.query(sql1, reservationData, function (error, results, fields) {
        if (error) throw error;

        // Set property.reserved = true
        var reservationId = results.insertId;
        var propertyId = reservationData.propertyId;
        var sql2 = "UPDATE properties SET reserved = 1 WHERE id = ?";
        dbConnection.query(sql2, [propertyId], function (error, results, fields) {
            if (error) throw error;
        });

        // Schedule task: after 5 days -> set property.reserved = false AND delete propertyReservation
        var schedule = require('node-schedule');
        var now = new Date();
        var taskDate = now.setMinutes(now.getMinutes() + 2);

        schedule.scheduleJob(taskDate, function(propertyId, reservationId) {
            console.log("Reservation time for property (id: " + propertyId + ") expired!");
            // Set property.reserved = false
            var sql1 = "UPDATE properties SET reserved = 0 WHERE id = ?";
            dbConnection.query(sql1, [propertyId], function (error, results, fields) {
                if (error) throw error;
            });
            // Delete propertyReservation
            var sql2 = "DELETE FROM propertyReservations WHERE reservationId = ?";
            dbConnection.query(sql2, [reservationId], function (error, results, fields) {
                if (error) throw error;
            });
        }.bind(null, propertyId, reservationId));

        res.json({ reservationId: reservationId });

    });
    
    
}


