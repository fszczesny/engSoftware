'use strict';

angular
    .module('user')
    .factory('UserService', ['UserSession',
                             'ClientUserTypes',
                             'EmployeeUserTypes',
                             'UsersAPI',
                             function(UserSession, ClientUserTypes, EmployeeUserTypes, UsersAPI) {
        var user = null;

        var fetchUserData = function() {
            user = UserSession.getSession();
            if (user != null) {
                var userId = user.id;
                UsersAPI.get({ userId: userId }).$promise.then(function(resp) {
                    var userData = resp.userData;
                    UserSession.setSession(userData);
                    updateUserData();
                }).catch(function(error) {
                    console.log('Error', error);
                });
            }
        };

        var updateUserData = function() {
            user = UserSession.getSession();
        };

        var isLoggedIn = function() {
            return user != null;
        }

        var getUserData = function() {
            return user;
        }

        /*
         * LogInInfo: { username: String, password: String }
         * > Promise: -> userData: Object
         */
        var logIn = function(logInInfo) {
            return new Promise(function(resolve, reject) {
                UsersAPI.logIn(logInInfo).$promise.then(function(resp) {
                    var userData = resp.userData;
                    if (userData != null) {
                        // Login successful
                        UserSession.setSession(userData);
                        updateUserData();
                        resolve(userData);
                    } else {
                        reject({
                            msg: 'Usuário ou senha inválidos!'
                        })
                    }
                }).catch(function(error) {
                    console.log('Error', error);
                    reject({
                        msg: 'ERRO: Não foi possível fazer login'
                    })
                });
            });
        };

        var logOut = function(callback) {
            if (isLoggedIn()) {
                UserSession.endSession();
                updateUserData();
                if (typeof callback == 'function')
                    callback();
            }
        }

        // > User Type management
        var checkUserType = function(userType) {
            if (isLoggedIn()) {
                return getUserData().userType == userType;
            } else {
                return false;
            }
        }

        fetchUserData();

        var User = {
            update: updateUserData,
            logIn: logIn,
            logOut: logOut,
            getUserData: getUserData,
            isLoggedIn: isLoggedIn,

            // > User Type management
            isClient: function() {
                return checkUserType('Customer') || checkUserType('Owner');
            },
            isEmployee: function() {
                return checkUserType('Manager') || checkUserType('Supervisor') || checkUserType('Consultant');
            },
            isCustomer: function() {
                return checkUserType('Customer');
            },
            isManager: function() {
                return checkUserType('Manager');
            },
            isAdmin: function() {
                return checkUserType('Manager') || checkUserType('Supervisor');
            }
        };

        return User;
    }]);