'use strict';

angular
    .module('property')
    .factory('PropertiesAPI', ['$resource', function($resource) {

        return $resource('/api/property/:propertyId', {}, {
            getAll:             { method: 'GET', isArray: true },
            get:                { method: 'GET' },
            // Rents
            loadRents:          { method: 'GET', url: '/api/property/rents/load/:propertyId', isArray: true },
            getRents:           { method: 'GET', url: '/api/property/rents/get/:approved', isArray: true },
            rent:               { method: 'POST', url: '/api/property/rents' },
            approveRent:        { method: 'POST', url: '/api/property/rents/approve' },
            // Reservations
            reserve:            { method: 'POST', url: '/api/property-reservations' },
            getReservations:    { method: 'GET', url: '/api/property-reservations', isArray: true },
            // Sales
            saveSale:           { method: 'POST', url: '/api/property-sales' },
            getSales:           { method: 'GET', url: '/api/property-sales/:approved', isArray: true },
            approveSale:        { method: 'POST', url: '/api/property-sales/approve' },
        });

    }]);