angular
    .module('user')
    .factory('UserInfo', ['$kinvey', function($kinvey) {
        var activeUser;
        var user = null;

        var update = function() {
            activeUser = $kinvey.User.getActiveUser();
            if (activeUser != null) {
                user = activeUser.data;
            }
        };

        update();

        return {
            update: update,
            getUserInfo: function() {
                return user;
            },
        };
    }]);