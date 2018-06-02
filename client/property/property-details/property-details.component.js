angular
    .module('property')
    .component('propertyDetails', {
        templateUrl: 'property/property-details/property-details.template.html',
        controller: ['$state',
                     'PropertiesAPI',
                     '$scope',
                     'GoHome',
                     'NoPhotoImg',
                     'UserAuth',
                     function($state, PropertiesAPI, $scope, GoHome, NoPhotoImg, UserAuth) {

            var self = this;
            var propertyId = $state.params.propertyId;

            this.noPhotoImg = NoPhotoImg;
            this.rentOrSaleToTxt = function(rentOrSale) {
                var text = {
                    'rent': 'Alugar',
                    'sale': 'Comprar',
                };
                return text[rentOrSale];
            }

            UserAuth.validate(function(UserService) {
                return UserService.isLoggedIn();
            }, function authError(UserService) {
                $state.go('propertyDetails', { propertyId: propertyId });
            }, function authSuccess(UserService) {});

            // Load property data
            this.property = PropertiesAPI.get({ propertyId: propertyId }, function() {
                if (typeof self.property.id == 'undefined') {
                    alert('Imóvel não existe');
                    GoHome.go();
                }
            });

            // Transaction
            this.doRentOrSale = function() {
                var property = this.property;

                // Pre-validate
                if (property.sold) {
                    alert('Este imóvel já foi vendido!');
                    return false;
                }

                if (!UserAuth.isLoggedIn()) {
                    alert('É necessário conectar à sua conta para alugar/comprar imóveis');
                    return false;
                }

                var userId = UserAuth.Service.getUserData().id;
                if (userId == property.ownerId) {
                    alert('Você não pode comprar/alugar o próprio imóvel');
                    return false;
                }

                if (property.rentOrSale == 'rent') {
                    $state.go('propertyDetails.rent', { property: property });
                } else if (property.rentOrSale == 'sale') {
                    $state.go('propertyDetails.sale');
                }
            };

        }]
    });