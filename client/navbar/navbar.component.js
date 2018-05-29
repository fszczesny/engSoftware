'use strict';

angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['$scope', 'UserAuth', 'UserService',
                     function NavbarUserInfoController($scope, UserAuth, UserService) {

            var self = this;

            this.user = null;
            this.loggedIn = false;
            this.isAdmin = false;
            this.isManager = false;

            var loadUser = function(UserService) {
                self.user = UserService.getUserData();
                self.loggedIn = UserService.isLoggedIn();
                self.isAdmin = UserService.isAdmin();
                self.isManager = UserService.isManager();
            };

            UserAuth.addListener(loadUser, {
                callOnSubscribe: true
            })

            this.logOut = function() {
                UserService.logOut(function() {
                    $scope.$applyAsync();
                });
            }

        }]
    });