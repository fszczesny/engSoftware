'use strict';

angular
    .module('user')
    .factory('UsersAPI', ['$resource', function($resource) {

        return $resource('/api/user/:userId', {}, {
            get:         { method: 'GET' },
            create:      { method: 'POST' },
            checkExists: {
                            method: 'POST',
                            params: { userId: 'check-exist' },
                         },
            logIn:       {
                            method: 'POST',
                            params: { userId: 'login' }
                         },
            lookUp:      {
                            method: 'POST',
                            params: { userId: 'lookup' }
                         }
        });
    }]);