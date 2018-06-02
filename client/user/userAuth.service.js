'use strict';

angular
    .module('core')
    .factory('UserAuth', ['$rootScope', 'UserService', function($rootScope, UserService) {

        var listeners = [];

        var callListeners = function(userData) {
            console.log("> User Auth changed", userData);
            listeners.forEach(function(action) {
                action(UserService);
            });
        };

        $rootScope.$watch(function() { return UserService.getUserData() }, callListeners, true);

        /*
         * Registers action for User auth data change event
         * action: function(UserService)
         * options: Object {
         *              callOnSubscribe: Bool   [if true => will fire the action right on subscription]
         *          }
         */
        var addListener = function(action, options) {
            if (typeof action !== 'function') return;

            listeners.push(action);

            // > Options management
            if (typeof options == 'object') {
                var userData = UserService.getUserData();
                if (options.callOnSubscribe) {
                    // Wait for injections load
                    setTimeout(function() {
                        action(UserService);
                    }, 2);
                }
            }
        };

        /*
         * Validate user auth on User auth data change event
         * validator: function(UserService) -> bool
         * authFailed: [function(UserService): called if auth validation fails]?
         * authSuccess: [function(UserService): called if auth validation succeed]?
         */
        var validateAuth = function(validator, authFailed, authSuccess) {
            if (typeof validator !== 'function') return;

            addListener(function() {
                if (!validator(UserService)) {
                    if (typeof authFailed == 'function') authFailed(UserService);
                } else {
                    if (typeof authSuccess == 'function') authSuccess(UserService);
                }
            }, {
                callOnSubscribe: true
            })
        };

        return  {
            addListener: addListener,
            validate: validateAuth,

            Service: UserService,

            isLoggedIn: function() {
                return UserService.isLoggedIn();
            }
        };

    }]);