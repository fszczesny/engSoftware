
angular
    .module('user')
    .component('signUp', {
        templateUrl: 'user/sign-up/sign-up.template.html',
        controller: ['SignUpService', 'GoHome', 'User', function SignUpController(SignUpService, GoHome, User) {
            if (User.isLoggedIn()) {
                console.log("here");
                GoHome.go();
            }

            this.submit = function(isValid) {
                if (isValid) {
                    if (this.password != this.passwordConfirm) {
                        alert("As senhas devem ser iguais!");
                        return false;
                    }

                    var userData = {
                        username: this.cpf,
                        password: this.password,
                        name: this.name,
                        phone: this.phone,
                        address: this.address, // { line: String, city: String, state: String }
                        email: this.email,
                        userType: 'Customer'
                    };

                    SignUpService.signUp(userData).then(function(user) {
                        GoHome.go();
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