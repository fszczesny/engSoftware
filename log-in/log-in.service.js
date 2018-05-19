angular
    .module('user')
    .factory('LogInService', ['$kinvey', 'User', function($kinvey, User) {
        var logIn = function(logInInfo) {
            return new Promise(function(resolve, reject) {
                var kinveyPromise = $kinvey.User.login(logInInfo);
                kinveyPromise.then(function(user) {
                    User.update();
                    resolve(user);
                }).catch(function(error) {
                    console.log("Failed logging in", error);
                    reject(error);
                });
            });
        };

        return {
            logIn: logIn,
        };
    }]);