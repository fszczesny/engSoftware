angular
    .module('user')
    .component('logIn', {
        templateUrl: 'user/log-in/log-in.template.html',
        controller: ['LogInService', 'GoHome', 'User', function LogInController(LogInService, GoHome, User) {
            if (User.isLoggedIn()) {
                GoHome.go();
            }

            this.logIn = function() {
                LogInService.logIn({
                    username: this.username,
                    password: this.password
                }).then(function(user) {
                    GoHome.go();
                }).catch(function(error) {
                    alert(error.msg); 
                })
            }
        }]
    });