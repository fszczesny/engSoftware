angular
    .module('navbar')
    .component('navbar', {
        templateUrl: 'navbar/navbar.template.html',
        controller: ['User', '$scope', function NavbarUserInfoController(User, $scope) {
            var self = this;

            self.user = null;
            self.loggedIn = false;

            var loadUser = function() {
                self.user = User.getUserInfo();
                self.loggedIn = self.user != null;
            }

            $scope.$watch(function() { return User.getUserInfo() }, function(user) {
                loadUser();
            }, true);

            self.logOut = function() {
                User.logOut(function() {
                    $scope.$applyAsync();
                });
            }

        }]
    });