'use strict';

angular
    .module('home')
    .component('home', {
        templateUrl: 'home/home.template.html',
        controller: ['HomeService',
                     'PropertiesAPI',
                     function(HomeService, PropertiesAPI) {

            var self = this;

            this.properties = PropertiesAPI.query();
            
        }]
    });