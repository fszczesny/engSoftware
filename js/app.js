var app = angular.module('RealEstate', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var homeState = {
        name: 'home',
        url: '/home',
        template: '<h3>Home</h3>'
    };

    var signUpState = {
        name: 'signUp',
        url: '/signUp',
        template: '<h3>Sign Up</h3>'
    };

    $stateProvider.state(homeState);
    $stateProvider.state(signUpState);

    $urlRouterProvider.otherwise('/home');
}]);