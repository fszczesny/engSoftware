'use strict';

angular
    .module('property')
    .component('approveRents', {
        templateUrl: 'property/approve-rents/approve-rents.template.html',
        controller: ['UserAuth',
                     'GoHome',
                     'PropertiesAPI',
                     '$state',
                     function(UserAuth, GoHome, PropertiesAPI, $state) {

            var self = this;

            UserAuth.validate(function(UserService) {
                return UserService.isAdmin();
            }, function authError() {
                GoHome.go();
            }, function authSuccess() {});


            this.rents = PropertiesAPI.getRents({ approved: 0 }, function() {
                self.rents.forEach(function(rent) {
                    var startStr = moment(rent.startDate).format('DD/MM');
                    var endStr = moment(rent.endDate).format('DD/MM');
                    rent.dateStartStr = startStr;
                    rent.dateEndStr = endStr;
                });
            });

            this.approveRent = function(rent) {
                if (!rent.payApproved) {
                    alert('Para aprovar o alguel, o pagamento deve ter sido efetuado.');
                    return;
                }

                var rentInfo = {
                    rentId: rent.rentId,
                };

                PropertiesAPI.approveRent(rentInfo).$promise.then(function(resp) {
                    alert('Aluguel aprovado com sucesso!');
                    $state.reload();
                }).catch(function(error) {
                    console.log(error);
                    alert('Não foi possível aprovar o aluguel');
                });
            };

            // Order by
            this.orderAttr = 'rentId';
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
    })