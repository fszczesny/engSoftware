angular
    .module('user')
    .factory('SignUpService', ['$kinvey', 'User', function($kinvey, User) {
        var signUp = function(userData) {
            return new Promise(function(resolve, reject) {

                var existsPromise = $kinvey.User.exists(userData.username);
                existsPromise.then(function(exists) {
                    // Check user exists
                    if (exists) {
                        // Generate "User already exists" error
                        var error = {
                            code: 409,
                            message: "User already exists"
                        };
                        reject(error);
                    } else {
                        // Logout in case there is an active user
                        // Needed because of Kinvey!!!
                        $kinvey.User.logout().then(function() {

                            // Sign up new user
                            var kinveyPromise = $kinvey.User.signup(userData);
                            kinveyPromise.then(function(user) {
                                console.log(user);
                                // User is signed up and logged in
                                User.update();
                                resolve(user);
                            }).catch(function(error) {
                                console.log(error);
                                reject(error);
                            });

                        }).catch(function(error) {
                            console.log("Fail logging out", error);
                            reject(error)
                        });
                    }
                }).catch(function(error) {
                    console.log("Error: check user existance", error);
                    reject(error);
                });

                

            });
        };

        return {
            signUp: signUp
        };
    }]);