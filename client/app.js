angular.module('RealEstate', [
    'ui.router',
    'core',
    'user',
    'navbar',
    'property',
]);

angular.module('RealEstate').config(['$stateProvider',
                                     '$urlRouterProvider',
                                     function($stateProvider, $urlRouterProvider, User) {

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
        component: 'employeeSignUp',
        resolve: {
            checkAuth: function(User, GoHome) {
                if (!User.isManager()) {
                    GoHome.go();
                }
            }
        }
    };

    var insertPropertyState = {
        name: 'insertProperty',
        url: '/insertProperty',
        component: 'insertProperty',
        resolve: {
            checkAuth: function(User, GoHome) {
                if (!User.isAdmin()) {
                    GoHome.go();
                }
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

angular.module('RealEstate').run(['$http', '$window', function($http, $window) {
    /*var basicAuth = "kid_B1Km-D3RM:a5ff61eb48284d9683ff7a39705198f0";
    $http.defaults.headers.common['Authorization'] = "Basic " + btoa(basicAuth);

    $http({
        method: 'POST',
        url: 'https://baas.kinvey.com/user/kid_B1Km-D3RM/',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            "username": "0815981590",
            "password": "123456",
            "userType": "Supervisor",
            "name": "Joao Podre",
            "phone": "5345435932",
        }
    }).then(function successCallback(response) {
        console.log(response);
    }, function errorCallback(response) {
        console.log(response);
    });*/
}]);