angular
    .module('RealEstate')
    .controller('AppController', ['User', '$scope', function AppController(User, $scope) {

        $scope.$watch(function() { return User.getUserData() }, function(user) {
            console.log("User change", user);
        }, true);

    }]);