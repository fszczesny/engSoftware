angular
    .module('property')
    .component('insertProperty', {
        templateUrl: 'property/insert-property/insert-property.template.html',
        controller: ['$scope','User', function InsertPropertyController($scope, User) {
            var self = this;

            this.ownerInfo = null;

            this.loadOwner = function() {
                User.lookupUser(self.owner, function(user) {
                    console.log(user);
                    if (user != null)
                        self.ownerInfo = user.email;
                    else
                        this.ownerInfo = null;
                    $scope.$applyAsync();
                })
            }            

        }]
    })