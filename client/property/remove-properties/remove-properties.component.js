angular
    .module('property')
    .component('removeProperties', {
        templateUrl: 'property/remove-properties/remove-properties.template.html',
        controller: ['UserAuth',
                     'GoHome',
                     'PropertiesAPI',
                     '$state',
                     function(UserAuth, GoHome, PropertiesAPI, $state) {

            var self = this;

            UserAuth.validate(function(UserService) {
                return UserService.isAdmin();
            }, function authError(UserService) {
                GoHome.go();
            }, function authSuccess(UserService) {});

            this.properties = PropertiesAPI.getAll(function() {
                console.log(self.properties);
            });

            this.removeProperty = function(property) {
                if (property.isRent) {
                    alert('O imóvel está alugado!\nImpossível remover.');
                    return;
                }

                var remove = confirm('Tem certeza que deseja remover o imóvel?');

                if (remove) {
                    var promise = PropertiesAPI.remove({ propertyId: property.id }).$promise;
                    promise.then(function() {
                        $state.reload();
                    }).catch(function(error) {
                        console.log("ERROR: ", error);
                    })
                }
            }

            // Order By
            this.orderAttr = 'ownerCPF';
            this.orderReverse = false;
            this.orderByChange = function($event) {
                var headerEl = $event.currentTarget;
                var orderAttr = $(headerEl).attr('id');
                var orderDescending = $(headerEl).hasClass('descending');

                self.orderAttr = orderAttr;
                self.orderReverse = orderDescending;

                $(headerEl).toggleClass('descending');
            };

        }]
    })