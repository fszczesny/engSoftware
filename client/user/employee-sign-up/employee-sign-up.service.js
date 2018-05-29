'use strict';

angular
    .module('user')
    .factory('EmployeeSignUp', ['SignUpService', function(SignUpService) {

        var checkUserExists = function(username) {
            return SignUpService.checkUserExists(username);
        }

        var createUser = function (userData) {
            return SignUpService.createUser(userData);
        }

        return {
            createUser: createUser,
            checkUserExists: checkUserExists,
        }
    }]);