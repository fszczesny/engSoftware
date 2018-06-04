'use strict';

var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : "mysql-instance1.chtfx97aej23.sa-east-1.rds.amazonaws.com",
    user     : "root",
    password : "cS7-AT6-wsd-VEF",
    port     : 3306,
    database : "engSoftwareDB",
    timezone : "utc"
});

connection.connect(function(err) {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

exports.connection = connection;
