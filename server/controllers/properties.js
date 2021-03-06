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
    var sql = "SELECT p.*, ";
    sql += "(r.rentId IS NOT NULL) as isRent, ";
    sql += "oU.username AS ownerCPF, oU.name AS ownerName ";
    sql += "FROM properties AS p ";
    sql += "LEFT JOIN users AS oU ON (p.ownerId = oU.id) ";
    sql += "LEFT JOIN rents AS r ON ";
    sql += "(p.id = r.propertyId) AND (CURDATE() BETWEEN r.startDate AND r.endDate) ";
    sql += "WHERE sold = 0 AND reserved = 0";
    
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

exports.removeProperty = function(req, res) {
    var propertyId = req.params.propertyId;
    var sql = "DELETE FROM properties WHERE id = ?";
    
    dbConnection.query(sql, [propertyId], function (error, results, fields) {
        if (error) throw error;
        res.json({ removed: true, propertyId: propertyId });
    });
}


// > User properties

exports.getUserProperties = function(req, res) {
    var userId = req.params.userId;
    var sql = "SELECT p.*, (r.rentId IS NOT NULL) as isRent ";
    sql += "FROM properties AS p ";
    sql += "LEFT JOIN rents AS r ON ";
    sql += "(p.id = r.propertyId) AND (CURDATE() BETWEEN r.startDate AND r.endDate) ";
    sql += "GROUP BY p.id HAVING p.ownerId = ?";

    dbConnection.query(sql, [userId], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
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
};

exports.getRents = function(req, res) {
    var sql = "SELECT r.*, ";
    sql += "rU.name AS rentorName, ";
    sql += "rU.username AS rentorCPF, ";
    sql += "p.title AS propertyTitle ";
    sql += "FROM rents AS r ";
    sql += "LEFT JOIN users AS rU ON (rU.id = r.rentorId) ";
    sql += "LEFT JOIN properties AS p ON (p.id = r.propertyId)";

    if (req.params.approved)
        sql += " WHERE approved = " + req.params.approved;
    
    dbConnection.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};

exports.approveRent = function(req, res) {
    var rentId = req.body.rentId;

    var sql = "UPDATE rents SET approved = 1 WHERE rentId = ?";
    dbConnection.query(sql, [rentId], function (error, results, fields) {
        if (error) throw error;
        res.json(rentId);
    });
};

// > Reservations

var scheduledReservations = {
    // '<reservationId>': <scheduledTask>
};

var setPropertyReservedState = function(propertyId, reserved, callback) {
    reserved = + reserved; // Convert bool to int
    var sql2 = "UPDATE properties SET reserved = ? WHERE id = ?";
    dbConnection.query(sql2, [reserved, propertyId], function (error, results, fields) {
        if (error) throw error;
        if (typeof callback == 'function') callback();
    });
};

var deletePropertyReservation = function(reservationId, callback) {
    var sql2 = "DELETE FROM propertyReservations WHERE reservationId = ?";
    dbConnection.query(sql2, [reservationId], function (error, results, fields) {
        if (error) throw error;
        if (typeof callback == 'function') callback();
    });
};

var schedulePropertyReservationExpiration = function(propertyId, reservationId, callback) {
    var schedule = require('node-schedule');
    var now = new Date();

    // X minutes expiration time
    var taskDate = now.setMinutes(now.getMinutes() + 10);

    var task = schedule.scheduleJob(taskDate, function(propertyId, reservationId) {
        console.log("Reservation time for property (id: " + propertyId + ") expired!");
        // Set property.reserved = false
        setPropertyReservedState(propertyId, false);

        // Delete propertyReservation
        deletePropertyReservation(reservationId);

        delete scheduledReservations[reservationId];
    }.bind(null, propertyId, reservationId));

    scheduledReservations[reservationId] = task;
}

var cancelScheduledReservationTask = function(reservationId) {
    var task = scheduledReservations[reservationId];
    if (task) task.cancel();
    delete scheduledReservations[reservationId];
}

exports.newReservation = function(req, res) {
    var reservationData = req.body;
    
    // Insert propertyReservations table
    var sql1 = "INSERT propertyReservations SET ?";
    dbConnection.query(sql1, reservationData, function (error, results, fields) {
        if (error) throw error;

        var reservationId = results.insertId;
        var propertyId = reservationData.propertyId;

        // Set property.reserved = true
        setPropertyReservedState(propertyId, true);

        // Schedule task: after expiration period
        //  -> set property.reserved = false
        //  -> delete propertyReservation
        schedulePropertyReservationExpiration(propertyId, reservationId);

        res.json({ reservationId: reservationId });
    });
};

exports.getAllReservations = function(req, res) {
    var sql = "SELECT r.*, ";
    sql += "p.title AS propertyTitle, p.ownerId AS ownerId, ";
    sql += "u.name AS buyerName, u.username AS buyerCPF ";
    sql += "FROM propertyReservations AS r  ";
    sql += "INNER JOIN properties AS p ON (p.id = r.propertyId) ";
    sql += "INNER JOIN users AS u ON (u.id = r.buyerId) ";
    dbConnection.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};


// > Sales

exports.saveSale = function(req, res) {
    var saleData = req.body;
    var reservationId = saleData.reservationId;
    delete saleData['reservationId'];

    var sql = "INSERT sales SET ?";
    dbConnection.query(sql, saleData, function (error, results, fields) {
        if (error) throw error;

        // Keep property reserved until manager approve sale
        cancelScheduledReservationTask(reservationId);
        
        // Delete propertyReservation
        deletePropertyReservation(reservationId);

        res.json({ saleId: results.insertId })
    });
};

exports.getSales = function(req, res) {
    var sql = "SELECT s.*, ";
    sql += "bU.name AS buyerName, ";
    sql += "eU.name AS employeeName, ";
    sql += "oU.name AS ownerName, ";
    sql += "p.title AS propertyTitle ";
    sql += "FROM sales AS s ";
    sql += "LEFT JOIN users AS bU ON (bU.id = s.buyerId) ";
    sql += "LEFT JOIN users AS eU ON (eU.id = s.employeeId) ";
    sql += "LEFT JOIN users AS oU ON (oU.id = s.ownerId) ";
    sql += "LEFT JOIN properties AS p ON (p.id = s.propertyId)";

    if (req.params.approved)
        sql += " WHERE approved = " + req.params.approved;
    
    dbConnection.query(sql, [], function (error, results, fields) {
        if (error) throw error;
        res.json(results);
    });
};

exports.approveSale = function(req, res) {
    var saleId = req.body.saleId;
    var propertyId = req.body.propertyId;

    var resp = {};

    var sql1 = "UPDATE sales SET approved = 1 WHERE saleId = ?";
    dbConnection.query(sql1, [saleId], function (error, results, fields) {
        if (error) throw error;

        resp.saleId = saleId;
        if (resp.propertyId) res.json(resp);
    });


    var sql2 = "UPDATE properties SET sold = 1 WHERE id = ?";
    dbConnection.query(sql2, [propertyId], function (error, results, fields) {
        if (error) throw error;
        
        resp.propertyId = propertyId;
        if (resp.saleId) res.json(resp);
    });
    
};