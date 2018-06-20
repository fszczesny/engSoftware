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
            this.isEmployee = false;
            this.isOwner = false;

            var loadUser = function(UserService) {
                self.user = UserService.getUserData();
                self.loggedIn = UserService.isLoggedIn();
                self.isAdmin = UserService.isAdmin();
                self.isManager = UserService.isManager();
                self.isEmployee = UserService.isEmployee();
                self.isOwner = UserService.isOwner();
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

            $('a.nav-link:not(.dropdown-toggle), a.dropdown-item').click(function(e) {
                var collapse = $(this).parents('.navbar-collapse');
                collapse.collapse('hide');
            });

        }]
    });