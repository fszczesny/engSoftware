angular
    .module('user')
    .factory('UserSession', ['$window', function($window) {
        var localStorage = $window.localStorage;
        var localStorageItem = 'userSession';

        var getSession = function() {
            return JSON.parse(localStorage.getItem(localStorageItem));
        };

        var setSession = function(userData) {
            localStorage.setItem(localStorageItem, JSON.stringify(userData));
        };

        var endSession = function() {
            localStorage.removeItem(localStorageItem);
        };

        return {
            getSession: getSession,
            setSession: setSession,
            endSession: endSession
        };

    }]);