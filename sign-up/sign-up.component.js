
angular
    .module('signUp')
    .component('signUp', {
        templateUrl: 'sign-up/sign-up.template.html',
        controller: function SignUpController() {
            this.submit = function(isValid) {
                if (isValid) {
                    if (this.password != this.passwordConfirm) {
                        alert("As senhas devem ser iguais!");
                        return false;
                    }
                    console.log(this.name);
                    console.log(this.cpf);
                    console.log(this.phone);
                    console.log(this.address);
                    console.log(this.email);
                    console.log(this.password);
                    console.log(this.passwordConfirm); 
                } 
            }
        }
    });