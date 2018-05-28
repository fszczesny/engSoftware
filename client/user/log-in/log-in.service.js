angular
    .module('user')
    .factory('LogInService', ['User', function(User) {

        var logIn = function(logInInfo) {
            return new Promise(function(resolve, reject) {
                User.logIn(logInInfo).then(function(userData) {
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