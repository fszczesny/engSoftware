angular
    .module('property')
    .component('approveSales', {
        templateUrl: 'property/approve-sales/approve-sales.template.html',
        controller: ['UserAuth',
                     'PropertiesAPI',
                     'GoHome',
                     '$state',
                     function(UserAuth, PropertiesAPI, GoHome, $state) {

            var self = this;

            UserAuth.validate(function(UserService) {
                return UserService.isAdmin();
            }, function authError() {
                GoHome.go();
            }, function authSuccess() {});

            this.sales = PropertiesAPI.getSales({ approved: 0 }, function() {
                self.sales.forEach(function(sale) {
                    var dateStr = moment(sale.date).format('DD/MM - HH:mm');
                    sale.dateStr = dateStr;
                });
            });

            this.approveSale = function(sale) {
                var saleInfo = {
                    saleId: sale.saleId,
                    propertyId: sale.propertyId
                };

                PropertiesAPI.approveSale(saleInfo).$promise.then(function(resp) {
                    alert('Venda aprovada com sucesso!');
                    $state.reload();
                }).catch(function(error) {
                    console.log(error);
                    alert('Não foi possível aprovar a venda');
                });
            }; 

            // Order by
            this.orderAttr = 'saleId';
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