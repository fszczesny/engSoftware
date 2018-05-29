'use strict';

angular
    .module('user')
    .factory('LogInService', ['UserService', function(UserService) {

        var logIn = function(logInInfo) {
            return new Promise(function(resolve, reject) {
                UserService.logIn(logInInfo).then(function(userData) {
                    resolve(userData);
                }).catch(function(error) {
                    reject(error);
                });
            });
        };

        return {
            logIn: logIn,
        };
    }]);