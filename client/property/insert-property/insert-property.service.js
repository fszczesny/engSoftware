'use strict';

angular
    .module('property')
    .factory('InsertPropertyService', ['UserService',
                                       'UsersService',
                                       'File',
                                       'PropertiesAPI',
                                       function(UserService, UsersService, File, PropertiesAPI) {
        
        var loadOwnerInfo = function(ownerUsername, callback) {
            var resp = {
                ownerInfo: null,
                invalidMsg: null,
            };

            // Empty owner
            if (!ownerUsername || ownerUsername.length == 0) {
                if (typeof callback == 'function')
                    callback(resp);
                return;
            }

            // Avoid owner to be current active user
            if (UserService.getUserData().username == ownerUsername) {
                resp.ownerInfo = null;
                resp.invalidMsg = "O proprietário não pode ser você mesmo";
                if (typeof callback == 'function')
                    callback(resp);
                return;
            }

            // Load owner info
            UsersService.lookUpUser(ownerUsername).then(function(ownerInfo) {
                if (ownerInfo != null) {
                    if (UsersService.isClient(ownerInfo)) {
                        resp.ownerInfo = ownerInfo;
                        resp.invalidMsg = null;
                    } else {
                        resp.ownerInfo = null;
                        resp.invalidMsg = "Proprietário não pode ser um funcionário";
                    }
                } else {
                    resp.ownerInfo = null;
                    resp.invalidMsg = "Proprietário não cadastrado";
                }

                if (typeof callback == 'function')
                    callback(resp);
            });
        };

        var insertProperty = function(propertyInfo) {
            return new Promise(function(resolve, reject) {

                PropertiesAPI.save(propertyInfo, function success(resp) {
                    var propertyId = resp.propertyId;
                    resolve(propertyId);
                }, function error(error) {
                    reject({
                        msg: "Não foi possível inserir o imóvel"
                    })
                });
                
            });
        };

        var uploadPhoto = function(file) {
            return File.upload(file, '.jpg');
        };

        var removePhoto = function(imgUrl) {
            return File.delete(imgUrl);
        };

        return {
            loadOwnerInfo: loadOwnerInfo,
            insertProperty: insertProperty,
            uploadPhoto: uploadPhoto,
            removePhoto: removePhoto,
        };

    }]);