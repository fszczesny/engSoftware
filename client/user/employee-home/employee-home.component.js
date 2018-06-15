'use strict';

angular.
    module('user').
    component('employeeHome', {
        templateUrl :'user/employee-home/employee-home.template.html',
        controller:['GoHome',
                    '$state',
                    '$stateParams',
                    'UserService',
                    '$scope',
                    function EmployeeHome(GoHome, $state, $stateParams,UserService, $scope){

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