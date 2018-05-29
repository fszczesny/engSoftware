angular
    .module('user')
    .factory('Users', ['$http', function($http) {

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

                $http
                    .post('/api/user/lookup', {
                        username: username
                    }).then(function(resp) {
                        var userData = resp.data;
                        resolve(userData);
                    }).catch(function(error) {
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