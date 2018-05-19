angular
    .module('user')
    .factory('SignUpService', ['$kinvey', 'User', function($kinvey, User) {
        var signUp = function(userInfo) {
            return new Promise(function(resolve, reject) {
                var kinveyPromise = $kinvey.User.signup({
                    username: userInfo.cpf,
                    password: userInfo.password,
                    // Extra attributes
                    name: userInfo.name,
                    phone: userInfo.phone,
                    address: userInfo.address,
                    email: userInfo.email
                });

                kinveyPromise.then(function(user) {
                    console.log(user);
                    // User is signed up and logged in
                    User.update();
                    resolve(user);
                }).catch(function(error) {
                    console.log(error);
                    reject(error);
                });

            });
        };

        return {
            signUp: signUp
        };
    }]);