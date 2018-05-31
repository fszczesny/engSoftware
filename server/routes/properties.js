'use strict';

module.exports = function(app) {
    var property = require('../controllers/properties');

    app.route('/api/property')
            .post(property.insertProperty)
            .get(property.getAll);
    
    app.route('/api/property/:propertyId')
            .get(property.getPropertyById);

};