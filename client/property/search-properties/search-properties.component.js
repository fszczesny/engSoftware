'use strict';

angular
    .module('property')
    .component('searchProperties', {
        templateUrl: 'property/search-properties/search-properties.template.html',
        controller: ['SearchPropertiesService',
                     'PropertiesAPI',
                     'NoPhotoImg',
                     function(SearchPropertiesService, PropertiesAPI, NoPhotoImg) {

            var self = this;

            this.noPhotoImg = NoPhotoImg;
            this.properties = PropertiesAPI.query();
            this.rentOrSaleTxt = function(rentOrSale) {
                var text = {
                    'rent': 'Aluguel',
                    'sale': 'Venda',
                };
                return text[rentOrSale];
            };
            
        }]
    });