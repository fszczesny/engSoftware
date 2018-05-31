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



        }]
    });