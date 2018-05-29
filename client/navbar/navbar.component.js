angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['$scope', 'UserAuth', 'User',
                     function NavbarUserInfoController($scope, UserAuth, User) {

            var self = this;

            this.user = null;
            this.loggedIn = false;
            this.isAdmin = false;
            this.isManager = false;

            var loadUser = function(User) {
                self.user = User.getUserData();
                self.loggedIn = User.isLoggedIn();
                self.isAdmin = User.isAdmin();
                self.isManager = User.isManager();
            };

            UserAuth.addListener(loadUser, {
                callOnSubscribe: true
            })

            this.logOut = function() {
                User.logOut(function() {
                    $scope.$applyAsync();
                });
            }

        }]
    });