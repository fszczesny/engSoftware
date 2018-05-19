angular.module('RealEstate', [
    'ui.router',
    'kinvey',
    'core',
    'signUp',
    'user',
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

angular.module('RealEstate').run(['$kinvey', function($kinvey) {
    /*var activeUser = $kinvey.User.getActiveUser();
    console.log(activeUser);*/

    var promise = $kinvey.User.logout();
    promise = promise.then(function onSuccess() {
        console.log("Logout");
    }).catch(function onError(error) {
        console.log("Logout fail", error);
    });
}])