angular
    .module('user')
    .factory('LogInService', ['$kinvey', 'User', function($kinvey, User) {
        var logIn = function(logInInfo, callback) {
            var promise = $kinvey.User.login(logInInfo);
            var resp = {
                success: false,
                data: null
            };

            promise.then(function(user) {
                resp.success = true;
                resp.data = user;
                User.update();
                if (typeof callback == 'function')
                    callback(resp);
            }).catch(function(error) {
                resp.success = false;
                resp.data = error;
                console.log("Failed logging in", error);
                if (typeof callback == 'function')
                    callback(resp);
            });
        };

        return {
            logIn: logIn,
        };
    }]);