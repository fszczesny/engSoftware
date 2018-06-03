'use strict';

angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['$scope', 'UserAuth', 'UserService', 'GoHome',
                     function NavbarUserInfoController($scope, UserAuth, UserService, GoHome) {

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
                self.isEmployee = UserService.isEmployee();
                $scope.$applyAsync();
            };

            UserAuth.addListener(loadUser, {
                callOnSubscribe: true
            })

            this.goHome = function() {
                GoHome.go();
            };

            this.logOut = function() {
                UserService.logOut(function() {
                    GoHome.go();
                    $scope.$applyAsync();
                });
            };

        }]
    });