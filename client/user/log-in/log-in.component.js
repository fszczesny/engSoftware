'use strict';

angular
    .module('user')
    .component('logIn', {
        templateUrl: 'user/log-in/log-in.template.html',
        controller: ['LogInService', 'GoHome', 'UserAuth', function LogInController(LogInService, GoHome, UserAuth) {
            
            UserAuth.validate(function(UserService) { 
                return !UserService.isLoggedIn();
            }, function authFailed(UserService) {
                GoHome.go();
            }, function authSuccess(UserService) {});

            this.logIn = function() {
                LogInService.logIn({
                    username: this.username,
                    password: this.password
                }).then(function(user) {
                    GoHome.go();
                }).catch(function(error) {
                    alert(error.msg); 
                })
            }
        }]
    });