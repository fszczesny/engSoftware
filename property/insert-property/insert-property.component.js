angular
    .module('property')
    .component('insertProperty', {
        templateUrl: 'property/insert-property/insert-property.template.html',
        controller: ['$scope','User', 'GoHome',
                        function InsertPropertyController($scope, User, GoHome) {
            var self = this;

            if (!User.isManager()) {
                GoHome.go();
            }

            $scope.$watch(function() { return User.getUserInfo() }, function(user) {
                if (!User.isManager()) {
                    GoHome.go();
                }
            }, true);


            this.ownerInfo = null;

            this.loadOwner = function() {
                // Avoid owner to be current active user
                if (self.owner.length == 0 || User.getUserInfo().username == self.owner) {
                    self.ownerInfo = null;
                    return;
                }

                User.lookupUser(self.owner, function(user) {
                    if (user != null)
                        self.ownerInfo = user;
                    else
                        self.ownerInfo = null;
                    $scope.$applyAsync();
                })
            }            

        }]
    })