'use strict';

angular.module('RealEstate', [
    'ui.router',
    'ngResource',
    'core',
    'user',
    'home',
    'navbar',
    'property',
]);

angular.module('RealEstate').config(['$stateProvider',
                                     '$urlRouterProvider',
                                     function($stateProvider, $urlRouterProvider, UserAuth) {

    // > States
    var homeState = {
        name: 'home',
        url: '/home',
        component: 'home'
    };

    var signUpState = {
        name: 'signUp',
        url: '/signUp',
        component: 'signUp'
    };

    var logInState = {
        name: 'logIn',
        url: '/logIn',
        component: 'logIn'
    };

    var employeeSignUpState = {
        name: 'employeeSignUp',
        url: '/employeeSignUp',
        component: 'employeeSignUp',
        resolve: {
            checkAuth: function(UserAuth, GoHome) {
               // Implemented inside controller
            }
        }
    };

    var insertPropertyState = {
        name: 'insertProperty',
        url: '/insertProperty',
        component: 'insertProperty',
        resolve: {
            checkAuth: function(UserAuth, GoHome) {
                // Implemented inside controller
            }
        }
    };

    $stateProvider.state(homeState);
    $stateProvider.state(signUpState);
    $stateProvider.state(logInState);
    $stateProvider.state(employeeSignUpState);
    $stateProvider.state(insertPropertyState);

    $urlRouterProvider.otherwise('/home');
}]);

angular.module('RealEstate').run(['UserAuth', function(UserAuth) {

}]);