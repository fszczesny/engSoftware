angular.module('RealEstate', [
    'ui.router',
    'kinvey',
    'core',
    'user',
    'navbar',
    'property',
]);

angular.module('RealEstate').config(['$stateProvider',
                                     '$urlRouterProvider',
                                     '$kinveyProvider',
                                     function($stateProvider, $urlRouterProvider, $kinveyProvider) {
    
    // > Kinvey
    $kinveyProvider.init({
        appKey: 'kid_B1Km-D3RM',
        appSecret: 'a5ff61eb48284d9683ff7a39705198f0'
    });

    // > States
    var homeState = {
        name: 'home',
        url: '/home',
        template: '<h3>Home</h3>'
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

    $stateProvider.state(homeState);
    $stateProvider.state(signUpState);
    $stateProvider.state(logInState);
    $stateProvider.state(employeeSignUpState);
    $stateProvider.state(insertPropertyState);

    $urlRouterProvider.otherwise('/home');
}]);

angular.module('RealEstate').run(['$kinvey', function($kinvey) {
    
}])