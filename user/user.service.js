angular
    .module('user')
    .factory('User', ['$kinvey', function($kinvey) {
        var activeUser;
        var user = null;

        var updateUserInfo = function() {
            activeUser = $kinvey.User.getActiveUser();
            if (activeUser != null) {
                user = activeUser.data;
            } else {
                user = null;
            }
        };

        var logOut = function(callback) {
            if (user != null) {
                $kinvey.User.logout().then(function() {
                    updateUserInfo();
                    if (typeof callback == 'function')
                        callback();
                }).catch(function(error) {
                    console.log("Fail logging out", error);
                });
            }
        }

        var lookupUser = function(username, callback) {
            if (username.length == 0) return;
            
            var query = new $kinvey.Query();
            query.equalTo('username', username);
            query.limit = 1;
            var stream = $kinvey.Users.find(query, { discover: true });
            stream.subscribe(function(users) {
                if (typeof callback == 'function') {
                    if (users.length > 0)
                        callback(users[0]);
                    else
                        callback(null);
                }
            });
        }

        // > User Type management
        var checkUserType = function(userType) {
            if (User.isLoggedIn()) {
                if (User.getUserInfo().userType == userType) {
                    return true;
                }
            }
            return false;
        }
        
        var getClientUserTypes = function() {
            return [
                { id: 'Customer', name: 'Cliente' },
                { id: 'Owner', name: 'Proprietário' }
            ];
        }

        var getEmployeeUserTypes = function() {
            return [
                { id: 'Consultant', name: 'Consultor' },
                { id: 'Supervisor', name: 'Supervisor' },
                { id: 'Manager', name: 'Gerente' },
            ];
        }

        updateUserInfo();

        var User = {
            update: updateUserInfo,
            logOut: logOut,
            getUserInfo: function() {
                return user;
            },
            isLoggedIn: function() {
                return user != null;
            },
            
            lookupUser: lookupUser,

            // > User Type management
            getClientUserTypes: getClientUserTypes,
            getEmployeeUserTypes: getEmployeeUserTypes,
            isManager: function() {
                return checkUserType('Manager');
            },
            isAdmin: function() {
                return checkUserType('Manager') || checkUserType('Supervisor');
            },
            isCustomer: function() {
                return checkUserType('Customer');
            },
        };

        return User;
    }]);