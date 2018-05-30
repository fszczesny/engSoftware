'use strict';

angular.module('RealEstate', [
    'ui.router',
    'ngResource',
    'core',
    'user',
    'navbar',
    'property',
]);

angular.module('RealEstate').config(['$stateProvider',
                                     '$urlRouterProvider',
                                     function($stateProvider, $urlRouterProvider, UserAuth) {

    // > States
    var searchPropertiesState = {
        name: 'searchProperties',
        url: '/searchProperties',
        component: 'searchProperties'
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

    var employeeHomeState = {
        name: 'employeeHome',
        url: '/employeeHome',
        template: '<h3>Funcionário</h3>'
    };

    $stateProvider.state(searchPropertiesState);
    $stateProvider.state(signUpState);
    $stateProvider.state(logInState);
    $stateProvider.state(employeeSignUpState);
    $stateProvider.state(insertPropertyState);
    $stateProvider.state(employeeHomeState);

    //$urlRouterProvider.otherwise('/');
}]);

angular.module('RealEstate').run(['UserAuth', function(UserAuth) {

}]);