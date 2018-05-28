angular
    .module('user')
    .factory('Users', [function() {

        var checkUserType = function(userData, userType) {
            return userData.userType == userType;
        };

        var lookupUser = function(username, callback) {
            // If username is "" (null string)
            if (username.length == 0) return;
            
            // MISSING: API lookUpUser
        };

        return {
            lookUpUser: lookUpUser,
        };

    }]);