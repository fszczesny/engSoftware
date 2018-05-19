
angular
    .module('user')
    .component('signUp', {
        templateUrl: 'sign-up/sign-up.template.html',
        controller: ['SignUpService', function SignUpController(SignUpService) {
            var goToHomePage = function() {
                window.location.hash = "#!/home";
            };

            this.submit = function(isValid) {
                if (isValid) {
                    if (this.password != this.passwordConfirm) {
                        alert("As senhas devem ser iguais!");
                        return false;
                    }

                    var userInfo = {
                        name: this.name,
                        cpf: this.cpf,
                        phone: this.phone,
                        address: this.address, // { line: String, city: String, state: String }
                        email: this.email,
                        password: this.password
                    };

                    SignUpService.signUp(userInfo).then(function(user) {
                        goToHomePage();
                    }).catch(function(error) {
                        if (error.code == 409) {
                            alert('Usuário já existe');
                        } else {
                            alert('Erro no cadastro');
                        }
                    });
                } 
            }
        }]
    });