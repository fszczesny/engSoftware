'use strict';

angular
    .module('property')
    .component('ownerProperties', {
        templateUrl: 'property/owner-properties/owner-properties.template.html',
        controller: ['PropertiesAPI',
                     'UserAuth',
                     function(PropertiesAPI, UserAuth) {

            var self = this;

            var userId = UserAuth.info.getUserData().id;

            UserAuth.validate(function(UserService) {
                return UserService.isOwner();
            }, function authError() {
                GoHome.go();
            }, function authSuccess() {});

            this.properties = PropertiesAPI.getUserProperties({ userId: userId }, function() {
                self.properties.forEach(function(prop) {
                    // Set property status (rent, sold, available)
                    var available = !(prop.isRent || prop.sold);
                    var statusId = 'available';
                    var statusName = 'Disponível';

                    if (!available) {
                        if (prop.rentOrSale == 'sale') {
                            statusId = 'sold';
                            statusName = 'Vendido';
                        } else if (prop.rentOrSale == 'rent') {
                            statusId = 'rent';
                            statusName = 'Alugado';
                        }
                    }

                    prop.statusId = statusId;
                    prop.statusName = statusName;
                });
            });

            // Order By

            this.orderAttr = 'statusId';
            this.orderReverse = true;

        }]
    });