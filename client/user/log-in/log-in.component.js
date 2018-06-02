'use strict';

angular
    .module('user')
    .component('logIn', {
        templateUrl: 'user/log-in/log-in.template.html',
        controller: ['GoHome', 'UserAuth', function LogInController(GoHome, UserAuth) {
            
            UserAuth.validate(function(UserService) { 
                return UserService.isLoggedIn();
            }, function authFailed(UserService) {    
            }, function authSuccess(UserService) {
                GoHome.go();
            });

            this.logIn = function() {
                UserAuth.Service.logIn({
                    username: this.username,
                    password: this.password
                }).then(function(user) {
                    GoHome.go();
                }).catch(function(error) {
                    alert(error.msg); 
                });
            }
        }]
    });