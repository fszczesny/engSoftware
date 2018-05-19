angular.module('RealEstate', [
    'ui.router',
    'kinvey',
    'signUp'
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

    // > Routes
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

    $stateProvider.state(homeState);
    $stateProvider.state(signUpState);

    $urlRouterProvider.otherwise('/home');
}]);