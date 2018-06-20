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
        component: 'logIn',
        params: { toState: { name: null, params: null } },
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
        params: { property: null }
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
        component: 'approveSales'
    };

    var approveRentsState = {
        name: 'approveRents',
        url: '/approveRents',
        component: 'approveRents'
    };


    var employeeHomeState = {
        name: 'employeeHome',
        url: '/employeeHome',
        component: 'employeeHome'
    };

    var ownerPropertiesState = {
        name: 'ownerProperties',
        url: '/ownerProperties',
        component: 'ownerProperties',
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
    $stateProvider.state(approveRentsState);
    $stateProvider.state(ownerPropertiesState);

    $urlRouterProvider.otherwise('/searchProperties');
}]);

angular.module('RealEstate').run(['UserAuth', function(UserAuth) {

}]);