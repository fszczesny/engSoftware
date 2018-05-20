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
            // > User Type management
            getClientUserTypes: getClientUserTypes,
            getEmployeeUserTypes: getEmployeeUserTypes,
            isManager: function() {
                return checkUserType('Manager');
            },
            isCustomer: function() {
                return checkUserType('Customer');
            },
        };

        return User;
    }]);