'use strict';

angular.
    module('user').
    component('employeeHome', {
        templateUrl :'user/employee-home/employee-home.template.html',
        controller:['UserService',
                    '$scope',
                    function EmployeeHome(UserService, $scope){

            var self = this;

            this.user = null;
            this.loggedIn = false;
            this.isAdmin = false;
            this.isManager = false;

            var loadUser = function() {
                self.user = UserService.getUserData();
                self.loggedIn = UserService.isLoggedIn();
                self.isAdmin = UserService.isAdmin();
                self.isManager = UserService.isManager();
                self.isEmployee = UserService.isEmployee();
                $scope.$applyAsync();
            };
            
            loadUser();
            }
        ]
    });