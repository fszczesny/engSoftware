angular
    .module('property')
    .component('sellProperty', {
        templateUrl: 'property/sell-property/sell-property.template.html',
        controller: ['$stateParams',
                     '$window',
                     '$state',
                     'UserService',
                     'PropertiesAPI',
                     'GoHome',
                     function($stateParams, $window, $state, UserService, PropertiesAPI, GoHome) {

            var self = this;

            // Auto scroll
            $window.scrollTo(0, $('sell-property').offset().top);

            this.property = $stateParams.property || $state.go('propertyDetails');
            
            // Sale term
            this.saleTermsPDFUrl = 'https://s3-sa-east-1.amazonaws.com/eng-software-property-imgs-eb4b5ce6-6301-11e8-adc0-fa7ae01bbebc/saleTerms.pdf';
            this.displaySaleTerms = false;
            this.saleTermsWasReads = false;
            this.showSaleTerms = function() {
                this.displaySaleTerms = true;
                $('body').addClass('noScroll');
                this.saleTermsWasRead = true;
            };
            this.hideSaleTerms = function() {
                this.displaySaleTerms = false;
                $('body').removeClass('noScroll');
            }

            // Submit
            this.submit = function() {
                if (!this.saleTermsWasRead) {
                    alert('Por favor, leia e aceite o termo de responsabilidade.');
                    return;
                }

                if (!this.acceptTerms) {
                    alert('Por favor, aceite o termo de responsabilidade');
                    return;
                }

                var property = this.property;
                var user = UserService.getUserData();

                var reservationData = {
                    propertyId: property.id,
                    buyerId: user.id
                };             

                PropertiesAPI.reserve(reservationData).$promise.then(function(resp) {
                    var msg = 'Imóvel reservado!\n';
                    msg += 'Lembre-se: você tem um prazo de 5 dias para comparecer ';
                    msg += 'a uma de nossas lojas físicas para efetuar a compra do imóvel.';
                    alert(msg);
                    GoHome.go();
                }).catch(function(error) {
                    alert('Não foi possível reservar o imóvel!');
                    console.log(error);
                });
            }


        }]
    })