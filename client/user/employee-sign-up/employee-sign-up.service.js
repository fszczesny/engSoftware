angular
    .module('user')
    .factory('EmployeeSignUp', ['$kinvey', function($kinvey) {
        var signUp = function (userData) {
            return new Promise(function(resolve, reject) {
                var kinveyPromise = $kinvey.User.update(userData);

                kinveyPromise.then(function(user) {
                    console.log(user);
                }).catch(function(error) {
                    console.log(error);
                });
            });
        }

        return {
            signUp: signUp
        }
    }]);