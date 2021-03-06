'use strict';

module.exports = function(app) {
        var property = require('../controllers/properties');

    app.route('/api/property')
        .post(property.insertProperty)
        .get(property.getAll);      // all NON-SOLD

    app.route('/api/property/:propertyId')
        .get(property.getPropertyById)
        .delete(property.removeProperty);


    // User Properties
    app.route('/api/user-properties/:userId')
        .get(property.getUserProperties);
        

    // Rents
    app.route('/api/property/rents')
        .post(property.newRent);

    app.route('/api/property/rents/load/:propertyId')
        .get(property.loadRents);

    app.route('/api/property/rents/get/:approved')
        .get(property.getRents);

    app.route('/api/property/rents/approve')
        .post(property.approveRent);

            
    // Reservations
    app.route('/api/property-reservations')
        .post(property.newReservation)
        .get(property.getAllReservations);


    // Sales
    app.route('/api/property-sales')
        .get(property.getSales)
        .post(property.saveSale);

    app.route('/api/property-sales/:approved')
        .get(property.getSales);


    app.route('/api/property-sales/approve')
        .post(property.approveSale);

};