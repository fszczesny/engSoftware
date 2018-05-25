angular
    .module('RealEstate')
    .controller('AppController', ['User', '$scope', function AppController(User, $scope) {

        $scope.$watch(function() { return User.getUserInfo() }, function(user) {
            console.log("User change", user);
        }, true);

    }]);