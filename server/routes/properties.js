'use strict';

module.exports = function(app) {
    var property = require('../controllers/properties');

    app.route('/api/property')
            .post(property.insertProperty)
            .get(property.getAll);      // All NON-SOLD properties
    
    app.route('/api/property/:propertyId')
            .get(property.getPropertyById);

    app.route('/api/property/availables')
            .get(property.getAvailables);


    // Rents

    app.route('/api/property/rents')
            .post(property.newRent);

    app.route('/api/property/rents/:propertyId')
            .get(property.loadRents);

};