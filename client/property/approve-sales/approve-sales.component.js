angular
    .module('property')
    .component('approveSales', {
        templateUrl: 'property/approve-sales/approve-sales.template.html',
        controller: ['UserAuth',
                     'PropertiesAPI',
                     function(UserAuth, PropertiesAPI) {

            var self = this;

            UserAuth.validate(function(UserService) {
                return UserService.isAdmin();
            }, function authError() {
                GoHome.go();
            }, function authSuccess() {});

            this.sales = PropertiesAPI.getSales({ approved: 0 }, function() {
                console.log(self.sales);
            });
            
        }]
    });