'use strict';

angular
    .module('property')
    .factory('PropertiesAPI', ['$resource', function($resource) {

        return $resource('/api/property/:propertyId', {}, {
            getAll:     { method: 'GET', isArray: true },
            get:        { method: 'GET' },
            loadRents:  {
                            method: 'GET',
                            isArray: true,
                            url: '/api/property/rents/:propertyId'
                        },
            rent:       {
                            method: 'POST',
                            url: '/api/property/rents'
                        },
        });

    }]);