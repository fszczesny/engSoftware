angular
    .module('core')
    .factory('UserAuth', ['$rootScope', 'User', function($rootScope, User) {

        var listeners = [];

        var callListeners = function(userData) {
            console.log("> User Auth changed", userData);
            listeners.forEach(function(action) {
                action(User);
            });
        };

        $rootScope.$watch(function() { return User.getUserData() }, callListeners, true);

        /*
         * Registers action for User auth data change event
         * action: function(User)
         * options: Object {
         *              callOnSubscribe: Bool   [if true => will fire the action right on subscription]
         *          }
         */
        var addListener = function(action, options) {
            if (typeof action !== 'function') return;

            listeners.push(action);

            // > Options management
            if (typeof options == 'object') {
                var userData = User.getUserData();
                if (options.callOnSubscribe) {
                    // Wait for injections load
                    setTimeout(function() {
                        action(User);
                    }, 2);
                }
            }
        };

        /*
         * Validate user auth on User auth data change event
         * validator: function(User) -> bool
         * authFailed: [function(User): called if auth validation fails]?
         * authSuccess: [function(User): called if auth validation succeed]?
         */
        var validateAuth = function(validator, authFailed, authSuccess) {
            if (typeof validator !== 'function') return;

            addListener(function() {
                if (!validator(User)) {
                    if (typeof authFailed == 'function') authFailed(User);
                } else {
                    if (typeof authSuccess == 'function') authSuccess(User);
                }
            }, {
                callOnSubscribe: true
            })
        };

        return  {
            addListener: addListener,
            validate: validateAuth,

            getUser: function() {
                return User;
            }
        };

    }]);