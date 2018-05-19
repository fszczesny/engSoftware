angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['User', '$scope', function NavbarUserInfoController(User, $scope) {
            var self = this;

            this.user = null;
            this.loggedIn = false;

            // Watch user info / login status
            $scope.$watch(function() { return User.getUserInfo() }, function(user) {
                loadUser();
            }, true);

            var loadUser = function() {
                self.user = User.getUserInfo();
                self.loggedIn = self.user != null;
            }

            this.logOut = function() {
                User.logOut(function() {
                    $scope.$applyAsync();
                });
            }

        }]
    });