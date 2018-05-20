angular
    .module('user')
    .component('employeeSignUp', {
        templateUrl: 'user/employee-sign-up/employee-sign-up.template.html',
        controller: ['User', 'GoHome', function EmployeeSignUpController(User, GoHome) {
            if (!User.isManager()) {
                GoHome.go();
            }

            this.employeeUserTypes = User.getEmployeeUserTypes();

        }],
    });