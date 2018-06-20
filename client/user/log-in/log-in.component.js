'use strict';

angular
    .module('user')
    .component('logIn', {
        templateUrl: 'user/log-in/log-in.template.html',
        controller: ['GoHome',
                     'UserService',
                     '$state',
                     '$stateParams',
                     function LogInController(GoHome, UserService, $state, $stateParams) {

            var redirectSuccess = function() {
                var existsRedirectState = $stateParams && $stateParams.toState && $stateParams.toState.name;
                if (existsRedirectState) {
                    var toState = $stateParams.toState;
                    $state.go(toState.name, toState.params);
                } else {
                    GoHome.go();
                }
            };
            
            if (UserService.isLoggedIn()) {
                redirectSuccess();
            }

            this.logIn = function() {
                UserService.logIn({
                    username: this.username,
                    password: this.password
                }).then(function(user) {
                    redirectSuccess();
                }).catch(function(error) {
                    alert(error.msg); 
                });
            }
        }]
    });