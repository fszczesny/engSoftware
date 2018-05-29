angular
    .module('property')
    .factory('InsertPropertyService', ['User', 'Users', '$http', function(User, Users, $http) {
        
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
            if (User.getUserData().username == ownerUsername) {
                resp.ownerInfo = null;
                resp.invalidMsg = "O proprietário não pode ser você mesmo";
                if (typeof callback == 'function')
                    callback(resp);
                return;
            }

            // Load owner info
            Users.lookUpUser(ownerUsername).then(function(ownerInfo) {
                if (ownerInfo != null) {
                    if (Users.isClient(ownerInfo)) {
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

                // Will also update userType (Customer -> Owner) if needed
                $http
                    .post('/api/property/', propertyInfo)
                    .then(function(resp) {
                        var propertyId = resp.data.propertyId;
                        resolve(propertyId);
                    }).catch(function(error) {
                        reject({
                            msg: "Não foi possível inserir o imóvel"
                        })
                    });
            });
        };

        var uploadPhoto = function(file) {

        };

        return {
            loadOwnerInfo: loadOwnerInfo,
            insertProperty: insertProperty,
            uploadPhoto: uploadPhoto
        };

    }]);