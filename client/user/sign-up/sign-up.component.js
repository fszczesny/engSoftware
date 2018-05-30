'use strict';

angular
    .module('user')
    .component('signUp', {
        templateUrl: 'user/sign-up/sign-up.template.html',
        controller: ['SignUpService',
                     'GoHome',
                     'UserAuth',
                     'AddressStates', 
                     function SignUpController(SignUpService, GoHome, UserAuth, AddressStates) {

            UserAuth.validate(function(UserService) { 
                return !UserService.isLoggedIn();
            }, function authFailed(UserService) {
                GoHome.go();
            }, function authSuccess(UserService) {});

            this.addressStates = AddressStates;

            this.checkUserExists = function() {
                var username = this.cpf;
                if (username) {
                    // Will only check after username (str length) is valid
                    SignUpService.checkUserExists(username)
                    .then(function(userExists) {
                        // UI feedback
                        console.log("User exists", userExists);
                    });
                }
            }

            this.submit = function(isValid) {
                if (isValid) {
                    if (this.password != this.passwordConfirm) {
                        alert("As senhas devem ser iguais!");
                        return false;
                    }

                    var userData = {
                        userType: 'Customer',
                        username: this.cpf,
                        password: this.password,
                        name: this.name,
                        phone: this.phone,
                        address: this.address,
                        city: this.city,
                        state: this.state,
                        email: this.email
                    };

                    SignUpService.signUp(userData).then(function(user) {
                        GoHome.go();
                    }).catch(function(error) {
                        alert(error.msg);
                    });
                } 
            }
        }]
    });