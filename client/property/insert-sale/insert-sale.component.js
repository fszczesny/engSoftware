angular
    .module('property')
    .component('insertSale', {
        templateUrl: 'property/insert-sale/insert-sale.template.html',
        controller: ['$stateParams',
                     '$state',
                     '$scope',
                     'UserAuth',
                     'UsersAPI',
                     'PropertiesAPI',
                     'InsertSaleService',
                     'GoHome',
                     function($stateParams, $state, $scope, UserAuth, UsersAPI, PropertiesAPI, InsertSaleService, GoHome) {
            
            var self = this;

            UserAuth.validate(function(UserService) {
                return UserService.isEmployee();
            }, function authError() {
                GoHome.go();
            }, function authSuccess() {});

            // Load transaction info
            this.reservation = $stateParams.reservation || $state.go('propertyReservations');
            if (this.reservation.propertyId) {
                this.property = PropertiesAPI.get({ propertyId: this.reservation.propertyId });
            }
            if (this.reservation.buyerId) {
                this.buyer = UsersAPI.get({ userId: this.reservation.buyerId });
            }
            if (this.reservation.ownerId) {
                this.owner = UsersAPI.get({ userId: this.reservation.ownerId });
            }
            
            // Contract
            this.uploadingFile = false;
            this.fileURL = null;

            this.uploadFile = function() {
                var files = this.files;
                if (files && files[0]) {
                    self.uploadingFile = true;
                    InsertSaleService.uploadContract(files[0])
                        .then(function(url) {
                            self.uploadingFile = false;
                            self.fileURL = url;
                            $scope.$applyAsync();
                        }).catch(function(error) {
                            self.uploadingFile = false;
                            self.fileURL = null;
                            $scope.$applyAsync();
                        });
                }
            };

            this.removeFile = function() {
                if (this.fileURL == null) return;

                InsertSaleService.removeContract(this.fileURL)
                    .then(function(resp) {
                        self.fileURL = null;
                        $scope.$applyAsync();
                    }).catch(function(error) {
                        alert(error.msg);
                    });
            }

            this.submit = function(isValid) {
                if (!isValid) return false;

                if (self.uploadingFile) {
                    alert("Aguarde um instante!\nO contrato está sendo enviado.");
                    return;
                }

                if (self.fileURL == null) {
                    alert("Por favor, envie o arquivo do contrato.");
                    return;
                }

                var employee = UserAuth.info.getUserData();

                var saleInfo = {
                    buyerId: self.buyer.id,
                    ownerId: self.owner.id,
                    employeeId: employee.id,
                    propertyId: self.property.id,
                    price: self.price,
                    contract: self.fileURL,
                    // Support
                    reservationId: self.reservation.reservationId
                };
    
                PropertiesAPI.saveSale(saleInfo).$promise.then(function(resp) {
                    console.log(resp);
                    alert('Venda cadastrada com sucesso');
                    GoHome.go();
                }).catch(function(error) {
                    console.log(error);
                    alert('Não foi possível cadastrar a venda');
                });
                
            };

        }]
    });