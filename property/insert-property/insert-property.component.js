angular
    .module('property')
    .component('insertProperty', {
        templateUrl: 'property/insert-property/insert-property.template.html',
        controller: ['$scope','User', 'GoHome', 'InsertPropertyService',
                        function InsertPropertyController($scope, User, GoHome, InsertPropertyService) {

            var self = this;

            if (!User.isAdmin()) {
                GoHome.go();
            }

            $scope.$watch(function() { return User.getUserInfo() }, function(user) {
                if (!User.isAdmin()) {
                    GoHome.go();
                }
            }, true);

            this.ownerInfo = null;

            this.loadOwner = function() {
                InsertPropertyService.loadOwnerInfo(self.owner, function(resp) {
                    self.ownerInfo = resp.ownerInfo;
                    self.ownerInvalidMsg = resp.invalidMsg;
                    $scope.$applyAsync();
                });
            };

            this.submit = function(isValid) {
                if (self.ownerInfo == null) return;

                if (isValid) {
                    var propertyInfo = {
                        title: this.title,
                        ownerUsername: this.owner,
                        rentOrSale: this.rentOrSale,
                        price: this.price,
                        area: this.area,
                        rooms: this.rooms,
                        bathrooms: this.bathrooms,
                        address: this.address,
                        description: this.description
                    };

                    var promise = InsertPropertyService.insertProperty(propertyInfo);
                    promise.then(function(property) {
                        console.log(property);
                        alert("Imóvel inserido!");
                        GoHome.go();
                    }).catch(function(error) {
                        console.log(error);
                        alert("Erro na inserção do imóvel");
                        GoHome.go();
                    });
                }
            };

        }]
    })