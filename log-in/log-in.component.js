angular
    .module('user')
    .component('logIn', {
        templateUrl: 'log-in/log-in.template.html',
        controller: ['LogInService', function SignUpController(LogInService) {
            var goToHomePage = function() {
                window.location.hash = "#!/home";
            };

            this.logIn = function() {
                LogInService.logIn({
                    username: this.username,
                    password: this.password
                }).then(function(user) {
                    goToHomePage();
                }).catch(function(error) {
                    if (error.code == 401)
                        alert('Credenciais erradas!'); 
                })
            }
        }]
    });