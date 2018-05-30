'use strict';

angular.module('core', ['user']);

angular
    .module('core')
    .constant('NoPhotoImg', 'https://s3-sa-east-1.amazonaws.com/eng-software-property-imgs-eb4b5ce6-6301-11e8-adc0-fa7ae01bbebc/no-photo.jpg');

angular
    .module('core')
    .constant('AddressStates', [
        'AC',
        'AL',
        'AM',
        'AP',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MG',
        'MS',
        'MT',
        'PA',
        'PB',
        'PE',
        'PI',
        'PR',
        'RJ',
        'RN',
        'RO',
        'RR',
        'RS',
        'SC',
        'SE',
        'SP',
        'TO',
    ]);