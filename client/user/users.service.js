'use strict';

angular
    .module('user')
    .factory('UsersService', ['UsersAPI', function(UsersAPI) {

        var checkUserType = function(userData, userType) {
            return userData.userType == userType;
        };

        var lookUpUser = function(username, callback) {
            return new Promise(function(resolve, reject) {
                if (!username || username.length == 0) {
                    reject({
                        msg: "Usuário não pode ser nulo"
                    });
                    return;
                }

                UsersAPI.lookUp({
                    username: username
                }, function(resp) {
                    var userData = resp.userData;
                    resolve(userData);
                }, function(error) {
                    reject({
                        msg: "Não foi possível buscar o usuário"
                    });
                });
            });
        };

        return {
            lookUpUser: lookUpUser,

            // > User Type management
            isClient: function(userData) {
                return checkUserType(userData, 'Customer') || checkUserType(userData, 'Owner');
            },
            isCustomer: function(userData) {
                return checkUserType(userData, 'Customer');
            },
            isManager: function(userData) {
                return checkUserType(userData, 'Manager');
            },
            isAdmin: function(userData) {
                return checkUserType(userData, 'Manager') || checkUserType(userData, 'Supervisor');
            }
        };

    }]);