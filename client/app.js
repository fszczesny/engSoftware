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
        component: 'employeeSignUp'
    };

    var insertPropertyState = {
        name: 'insertProperty',
        url: '/insertProperty',
        component: 'insertProperty'
    };

    var propertyDetailsState = {
        name: 'propertyDetails',
        url: '/propertyDetails/{propertyId}',
        component: 'propertyDetails'
    };

    var rentPropertyState = {
        name: 'propertyDetails.rent',
        url: '/rent',
        component: 'rentProperty',
        params: { property: null, rents: null }
    };

    var salePropertyState = {
        name: 'propertyDetails.sale',
        url: '/sale',
        component: 'sellProperty',
        params: { property: null }
    };

    var propertyReservationsState = {
        name: 'propertyReservations',
        url: '/propertyReservations',
        component: 'propertyReservations',
    };

    var insertSaleState = {
        name: 'insertSale',
        url: '/insertSale',
        component: 'insertSale',
        params: { reservation: null }
    };

    var approveSalesState = {
        name: 'approveSales',
        url: '/approveSale',
        template: '<h3>Aprovar vendas</h3>'
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
    $stateProvider.state(propertyDetailsState);
    $stateProvider.state(rentPropertyState);
    $stateProvider.state(salePropertyState);
    $stateProvider.state(propertyReservationsState);
    $stateProvider.state(insertSaleState);
    $stateProvider.state(approveSalesState);

    $urlRouterProvider.otherwise('/searchProperties');
}]);

angular.module('RealEstate').run(['UserAuth', function(UserAuth) {

}]);