'use strict';

angular
    .module('home')
    .component('home', {
        templateUrl: 'home/home.template.html',
        controller: ['HomeService',
                     'PropertiesAPI',
                     'NoPhotoImg',
                     function(HomeService, PropertiesAPI, NoPhotoImg) {

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