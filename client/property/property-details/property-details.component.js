angular
    .module('property')
    .component('propertyDetails', {
        templateUrl: 'property/property-details/property-details.template.html',
        controller: ['$state',
                     'PropertiesAPI',
                     '$scope',
                     'GoHome',
                     'NoPhotoImg',
                     function($state, PropertiesAPI, $scope, GoHome, NoPhotoImg) {

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

            // Load property data
            this.property = PropertiesAPI.get({ propertyId: propertyId }, function() {
                if (typeof self.property.id == 'undefined') {
                    alert('Imóvel não existe');
                    GoHome.go();
                }
            });

            this.rents = PropertiesAPI.loadRents({ propertyId: propertyId }, function() {
                console.log(self.rents);
            })

            // Transaction
            this.doRentOrSale = function() {
                var property = this.property;
                if (property.sold) {
                    alert('Este imóvel já foi vendido!');
                    return false;
                }

                if (property.isRent) {
                    alert('Este imóvel já está alugado!');
                    return false;
                }

                if (property.rentOrSale == 'rent') {
                    this.doRent();
                } else if (property.rentOrSale == 'sale') {
                    this.doSale();
                }
            };

            this.doRent = function() {
                
            };

            this.doSale = function() {

            };

        }]
    });