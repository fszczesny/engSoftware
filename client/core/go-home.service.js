'use strict';

angular
    .module('core')
    .factory('GoHome', ['$state', 'UserService', function($state, UserService) {
        return {
            go: function() {
                if (UserService.isClient() || !UserService.isLoggedIn()) {
                    $state.go('searchProperties');
                } else {
                    $state.go('employeeHome');
                }
            }
        }
    }]);