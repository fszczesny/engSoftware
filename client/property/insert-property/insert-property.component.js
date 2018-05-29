angular
    .module('property')
    .component('insertProperty', {
        templateUrl: 'property/insert-property/insert-property.template.html',
        controller: ['$scope',
                     'UserAuth',
                     'GoHome',
                     'InsertPropertyService',
                     function InsertPropertyController($scope, UserAuth, GoHome, InsertPropertyService) {

            var self = this;

            UserAuth.validate(function(User) {
                return User.isAdmin();
            }, function authError(User) {
                GoHome.go();
            }, function authSuccess(User) {});

            // > Owner Management
            this.ownerInfo = null;
            this.ownerInvalidMsg = null;
            this.loadOwner = function() {
                InsertPropertyService.loadOwnerInfo(this.owner, function(resp) {
                    console.log(resp);
                    self.ownerInfo = resp.ownerInfo;
                    self.ownerInvalidMsg = resp.invalidMsg;
                    $scope.$applyAsync();
                });
            };

            // > Photo management
            this.uploadingPhoto = false;
            this.photoURL = null;

            this.uploadPhoto = function() {
                var photos = this.photos;
                if (photos && photos[0]) {
                    self.uploadingPhoto = true;
                    InsertPropertyService.uploadPhoto(photos[0])
                        .then(function(url) {
                            self.uploadingPhoto = false;
                            self.photoURL = url;
                            $scope.$applyAsync();
                        }).catch(function(error) {
                            self.uploadingPhoto = false;
                            self.photoURL = null;
                            $scope.$applyAsync();
                        });
                }
            };

            this.removePhoto = function() {
                if (this.photoURL == null) return;

                InsertPropertyService.removePhoto(this.photoURL)
                    .then(function(resp) {
                        self.photoURL = null;
                        $scope.$applyAsync();
                    }).catch(function(error) {
                        alert(error.msg);
                    });
            };

            this.submit = function(isValid) {
                if (this.ownerInfo == null) return;

                if (this.uploadingPhoto) {
                    alert("Aguarde um instante!\nA foto está sendo enviada.");
                    return;
                }

                if (isValid) {
                    var propertyInfo = {
                        title: this.title,
                        ownerId: this.ownerInfo.id,
                        rentOrSale: this.rentOrSale,
                        price: this.price,
                        area: this.area,
                        rooms: this.rooms,
                        bathrooms: this.bathrooms,
                        address: this.address,
                        city: this.city,
                        state: this.state,
                        description: this.description,
                        img: this.photoURL
                    };

                    InsertPropertyService.insertProperty(propertyInfo)
                        .then(function(propertyId) {
                            alert("Imóvel inserido!");
                            GoHome.go();
                        }).catch(function(error) {
                            console.log(error);
                            alert("Erro na inserção do imóvel");
                        });
                }
            };

        }]
    });