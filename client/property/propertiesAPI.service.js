'use strict';

angular
    .module('property')
    .factory('PropertiesAPI', ['$resource', function($resource) {

        return $resource('/api/property/:propertyId');
        //     'get':    {method: 'GET'},
        //     'save':   {method: 'POST'},
        //     'query':  {method: 'GET', isArray: true},
        //     'remove': {method: 'DELETE'},
        //     'delete': {method: 'DELETE'}

    }]);