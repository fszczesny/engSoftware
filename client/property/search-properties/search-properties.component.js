'use strict';

angular
    .module('property')
    .component('searchProperties', {
        templateUrl: 'property/search-properties/search-properties.template.html',
        controller: ['SearchPropertiesService',
                     'PropertiesAPI',
                     'NoPhotoImg',
                     '$scope',
                     'AddressStates',
                     function(SearchPropertiesService, PropertiesAPI, NoPhotoImg, $scope, AddressStates) {

            var self = this;

            this.noPhotoImg = NoPhotoImg;
            this.properties = PropertiesAPI.query();
            this.rentOrSaleToTxt = function(rentOrSale) {
                var text = {
                    'rent': 'Alugar',
                    'sale': 'Comprar',
                };
                return text[rentOrSale];
            };

            this.addressStates = AddressStates;
            this.orderBy = 'price';
            this.order = 'desc';

            // > Filters management
            this.enableFilter = {
                rooms: false,
                bathrooms: false,
                areaMin: false,
                areaMax: false,
                priceMin: false,
                priceMax: false,         
            };

            this.filterValue = {
                rooms: 1,
                bathrooms: 1,
                areaMin: 10,
                areaMax: undefined,
                priceMin: 100,
                priceMax: undefined,
            }

            this.filter = {
                rentOrSale: undefined,
                rooms: undefined,
                bathrooms: undefined,
            };

            this.filterChange = function(filterName) {
                this.filter[filterName] = (this.enableFilter[filterName]) ? this.filterValue[filterName] : undefined;
            };

            this.filterArea = function(property) {
                var areaMin = self.filterValue.areaMin;
                var areaMax = self.filterValue.areaMax;

                var compAreaMin = (areaMin) ? property.area >= areaMin : true;
                var compAreaMax = (areaMax) ? property.area <= areaMax : true;

                if (self.enableFilter.areaMin && self.enableFilter.areaMax) {
                    return compAreaMin && compAreaMax;
                } else if (self.enableFilter.areaMin) {
                    return compAreaMin;
                } else if (self.enableFilter.areaMax) {
                    return compAreaMax;
                } else {
                    return true;
                }
            };

            this.filterPrice = function(property) {
                var priceMin = self.filterValue.priceMin;
                var priceMax = self.filterValue.priceMax;

                var compPriceMin = (priceMin) ? property.price >= priceMin : true;
                var compPriceMax = (priceMax) ? property.price <= priceMax : true;

                if (self.enableFilter.priceMin && self.enableFilter.priceMax) {
                    return compPriceMin && compPriceMax;
                } else if (self.enableFilter.priceMin) {
                    return compPriceMin;
                } else if (self.enableFilter.priceMax) {
                    return compPriceMax;
                } else {
                    return true;
                }
            };

            this.search = function(property) {
                var q = self.filterValue.query || "";
                q = q.toLowerCase();
                var attrToMatch = [
                    'address',
                    'area',
                    'bathrooms',
                    'city',
                    'description',
                    'price',
                    'rooms',
                    'state',
                    'title'];

                var match = false;
                attrToMatch.forEach(function(attr) {
                    var value = property[attr].toString().toLowerCase();
                    if (value.search(q) >= 0) {
                        match = true;
                        return true;
                    }
                });
                return match;
            };

            
        }]
    });