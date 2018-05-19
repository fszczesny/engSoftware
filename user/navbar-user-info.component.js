angular
    .module('user')
    .component('navbarUserInfo', {
        templateUrl: 'user/navbar-user-info.template.html',
        controller: ['UserInfo', '$scope', function NavbarUserInfoController(UserInfo, $scope) {
            var self = this;
            
            self.user = UserInfo.getUserInfo();
            
            $scope.$watch(function() { return UserInfo.getUserInfo() }, function(val) {
                self.user = val;
            }, true);
        }]
    });