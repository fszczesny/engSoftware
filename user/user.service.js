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
            $kinvey.User.logout().then(function() {
                updateUserInfo();
                if (typeof callback == 'function')
                    callback();
            }).catch(function(error) {
                console.log("Fail logging out", error);
            });
        }

        updateUserInfo();

        return {
            update: updateUserInfo,
            logOut: logOut,

            getUserInfo: function() {
                return user;
            },
            isLoggedIn: function() {
                return user != null;
            }
        };
    }]);