'use strict';

angular
    .module('core')
    .factory('GoHome', function() {
        return {
            go: function() {
                window.location.hash = '#!/searchProperties';
            }
        }
    })