'use strict';

angular
    .module('property')
    .factory('PropertiesAPI', ['$resource', function($resource) {

        return $resource('/api/property/:propertyId', {}, {
            getAvailables:  { method: 'GET', isArray: true },
            get:            { method: 'GET' },
        });

    }]);