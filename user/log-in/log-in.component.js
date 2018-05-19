angular
    .module('user')
    .component('logIn', {
        templateUrl: 'log-in/log-in.template.html',
        controller: ['LogInService', 'GoHome', function SignUpController(LogInService, GoHome) {
            this.logIn = function() {
                LogInService.logIn({
                    username: this.username,
                    password: this.password
                }).then(function(user) {
                    GoHome.go();
                }).catch(function(error) {
                    if (error.code == 401)
                        alert('Credenciais erradas!'); 
                })
            }
        }]
    });