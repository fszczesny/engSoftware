'use strict';

angular.
    module('user').
    component('employeeHome', {
        templateUrl :'user/employee-home/employee-home.template.html',
        controller: ['UserService',
                     '$scope',
                     'EmployeeUserTypes',
                     function EmployeeHome(UserService, $scope, EmployeeUserTypes) {

            var self = this;

            this.user = null;
            this.loggedIn = false;
            this.isAdmin = false;
            this.isManager = false;
            this.userType = null;

            var getUserType = function(userInfo) {
                var userType = userInfo.userType;
                var userTypeInfo = $.grep(EmployeeUserTypes, function(e) { return e.id == userType })[0];
                return userTypeInfo.name;
            };

            var loadUser = function() {
                self.user = UserService.getUserData();
                self.loggedIn = UserService.isLoggedIn();
                self.isAdmin = UserService.isAdmin();
                self.isManager = UserService.isManager();
                self.isEmployee = UserService.isEmployee();
                self.userType = getUserType(self.user);
                $scope.$applyAsync();
            };
            
            loadUser();
        }]
    });