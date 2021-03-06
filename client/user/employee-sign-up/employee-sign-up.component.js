'use strict';

angular
    .module('user')
    .component('employeeSignUp', {
        templateUrl: 'user/employee-sign-up/employee-sign-up.template.html',
        controller: ['UserAuth',
                     'GoHome',
                     'EmployeeSignUp',
                     '$scope',
                     'EmployeeUserTypes',
                     'AddressStates',
                     function EmployeeSignUpController(UserAuth, GoHome, EmployeeSignUp, $scope, EmployeeUserTypes, AddressStates) {
            
            UserAuth.validate(function validator(UserService) {
                return UserService.isManager();
            }, function authFailed(UserService) {
                GoHome.go();
            }, function authSuccess(UserService) {});

            this.addressStates = AddressStates;
            this.employeeUserTypes = EmployeeUserTypes;

            this.checkUserExists = function() {
                var username = this.cpf;
                if (username) {
                    // Will only check after username (str length) is valid
                    EmployeeSignUp.checkUserExists(username)
                    .then(function(userExists) {
                        // UI feedback
                        console.log("User exists", userExists);
                    });
                }
            }

            this.submit = function(isValid) {
                if (!isValid) { return false; };

                if (this.password != this.passwordConfirm) {
                    alert("As senhas devem ser iguais!");
                    return false;
                }

                var userData = {
                    userType: this.userType,
                    username: this.cpf,
                    password: this.password,
                    name: this.name,
                    phone: this.phone,
                    address: this.address,
                    city: this.city,
                    state: this.state,
                    email: this.email
                };

                EmployeeSignUp.createUser(userData).then(function(user) {
                    alert("Funcionário cadastrado!");
                    GoHome.go();
                }).catch(function(error) {
                    alert(error.msg);
                });
            }

        }],
    });