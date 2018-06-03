angular
    .module('property')
    .component('propertyReservations', {
        templateUrl: 'property/property-reservations/property-reservations.template.html',
        controller: ['UserAuth',
                     'GoHome',
                     'PropertiesAPI',
                     '$state',
                     function(UserAuth, GoHome, PropertiesAPI, $state) {

            var self = this;

            UserAuth.validate(function(UserService) {
                return UserService.isEmployee();
            }, function authError() {
                GoHome.go();
            }, function authSuccess() {});

            this.reservations = PropertiesAPI.getReservations(function() {
                // Format date
                self.reservations.forEach(function(reservation) {
                    var dateStr = moment(reservation.reservationTime).format('DD/MM - HH:mm');
                    reservation.dateStr = dateStr;
                });
            });

            this.insertSale = function(reservation) {
                $state.go('insertSale', { reservation: reservation });
            };

            // Order by
            this.orderAttr = 'buyerName';
            this.orderReverse = false;
            this.orderByChange = function($event) {
                var headerEl = $event.currentTarget;
                var orderAttr = $(headerEl).attr('id');
                var orderDescending = $(headerEl).hasClass('descending');

                self.orderAttr = orderAttr;
                self.orderReverse = orderDescending;

                $(headerEl).toggleClass('descending');
            };

        }]
    });