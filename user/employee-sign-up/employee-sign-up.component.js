angular
    .module('user')
    .component('employeeSignUp', {
        templateUrl: 'user/employee-sign-up/employee-sign-up.template.html',
        controller: ['User', 'GoHome', 'SignUpService', '$scope',
                        function EmployeeSignUpController(User, GoHome, SignUpService, $scope) {
            if (!User.isManager()) {
                GoHome.go();
            }

            $scope.$watch(function() { return User.getUserInfo() }, function(user) {
                console.log("here");
                if (!User.isManager()) {
                    GoHome.go();
                }
            }, true);

            this.employeeUserTypes = User.getEmployeeUserTypes();

            this.submit = function(isValid) {
                if (isValid) {}

                var userData = {
                    username: this.cpf,
                    password: this.password,
                    name: this.name,
                    phone: this.phone,
                    address: this.address, // { line: String, city: String, state: String }
                    email: this.email,
                    userType: this.userType
                };

                SignUpService.signUp(userData).then(function(user) {
                    GoHome.go();
                }).catch(function(error) {
                    console.log(error);
                    if (error.code == 409) {
                        alert('Usuário já existe');
                    } else {
                        alert('Erro no cadastro');
                    }
                }); 
            }

        }],
    });