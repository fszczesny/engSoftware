angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['User', '$scope', function NavbarUserInfoController(User, $scope) {
            var self = this;

            this.user = null;
            this.loggedIn = false;
            this.isAdmin = false;
            this.isManager = false;

            // Watch user info / login status
            $scope.$watch(function() { return User.getUserData() }, function(user) {
                loadUser();
            }, true);

            var loadUser = function() {
                self.user = User.getUserData();
                self.loggedIn = User.isLoggedIn();
                self.isAdmin = User.isAdmin();
                self.isManager = User.isManager();
            }

            this.logOut = function() {
                User.logOut(function() {
                    $scope.$applyAsync();
                });
            }

        }]
    });