'use strict';

angular
    .module('property')
    .component('rentProperty', {
        templateUrl: 'property/rent-property/rent-property.template.html',
        controller: ['$stateParams',
                     'PropertiesAPI',
                     '$state',
                     '$window',
                     'UserService',
                     function($stateParams, PropertiesAPI, $state, $window, UserService) {

            var self = this;

            // Auto scroll
            $window.scrollTo(0, $('rent-property').offset().top);

            this.property = $stateParams.property || $state.go('propertyDetails');

            this.rents = PropertiesAPI.loadRents({ propertyId: this.property.id }, function() {
                self.rents.forEach(function(rent) {
                    rent.startDate = new Date(rent.startDate);
                    rent.endDate = new Date(rent.endDate);
                });
            });

            var isRentOnDate = function(date) {
                var isRent = false;
                self.rents.forEach(function(rent) {
                    if (date >= rent.startDate && date <= rent.endDate) {
                        isRent = true;
                        return true;
                    }
                });
                return isRent;
            }

            this.rentDays = null;
            this.totalPrice = null;
            
            // Date Picker
            var datePickerChanged = function() {
                if (self.date.startDate == null || self.date.endDate == null) {
                    self.rentDays = null;
                    return;
                }

                var sDate = self.date.startDate;
                var eDate = self.date.endDate;
                var rentDays = eDate.diff(sDate, 'days') + 1;
                var dailyPrice = self.property.price;

                self.rentDays = rentDays;
                self.totalPrice = rentDays * dailyPrice;
            }

            this.date = {
                startDate: null,
                endDate: null
            };

            this.datePickerOptions = {
                drops: 'up',
                locale: {
                    format: 'DD/MM/YYYY',
                    separator: ' à ',
                    applyLabel: 'Selecionar',
                    cancelLabel: 'Cancelar',
                    daysOfWeek: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
                    monthNames: [
                                    'Janeiro','Fevereiro','Março','Abril',
                                    'Maio','Junho','Julho','Agosto',
                                    'Setembro','Novembro','Dezembro'
                                ],
                },
                eventHandlers: {
                    'apply.daterangepicker': datePickerChanged
                },
                isInvalidDate: function(moment) {
                    var date = moment._d;
                    return isRentOnDate(date);
                }
            }

            // Form
            this.submit = function() {
                var property = self.property;
                var user = UserService.getUserData();
                var rentDays = self.rentDays;
                var startDate = self.date.startDate;
                var endDate = self.date.endDate;
                var totalPrice = self.totalPrice;
                var paymentMethod = self.paymentMethod;
                var creditCard = self.creditCard;
                var cardSafeCode = self.cardSafeCode;

                // Validation
                if (rentDays == null || startDate == null || endDate == null) {
                    alert('Selecione um período de aluguel');
                    return false;
                }

                if (!paymentMethod) {
                    alert('Selecione uma forma de pagamento');
                    return false;
                }

                if (paymentMethod == 'creditCard') {
                    if (!creditCard) {
                        alert('Digite o número do seu cartão de crédito');
                        return false;
                    } else if (creditCard.length != 16) {
                        alert('Número de cartão de crédito inválido');
                        return false;
                    }

                    if (!cardSafeCode) {
                        alert('Digite o código de segurança do seu cartão de crédito');
                        return false;
                    } else if (cardSafeCode.length != 3) {
                        alert('Código de segurança do cartão de crédito inválido');
                        return false;
                    }
                }

                var rentData = {
                    propertyId: property.id,
                    rentorId: user.id,
                    startDate: startDate.format('YYYY-MM-DD'),
                    endDate: endDate.format('YYYY-MM-DD')
                }

                PropertiesAPI.rent(rentData).$promise.then(function(resp) {
                    alert('Parabéns! Imóvel alugado!');
                    $state.go('searchProperties');
                }).catch(function(error) {
                    alert('Desculpe-nos! Não foi possível alugar o imóvel.');
                    console.log(error);
                });
            }

        }] 
    })