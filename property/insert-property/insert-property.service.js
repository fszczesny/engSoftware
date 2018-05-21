angular
    .module('property')
    .factory('InsertPropertyService', ['User', '$kinvey', function(User, $kinvey) {
        
        var loadOwnerInfo = function(ownerUsername, callback) {
            var resp = {
                ownerInfo: null,
                invalidMsg: null,
            };

            // Avoid owner to be current active user
            if (ownerUsername.length == 0 || User.getUserInfo().username == ownerUsername) {
                resp.ownerInfo = null;
                resp.invalidMsg = "O proprietário não pode ser você mesmo";
                if (typeof callback == 'function')
                    callback(resp);
                return;
            }

            User.lookupUser(ownerUsername, function(ownerInfo) {
                if (ownerInfo != null) {
                    if (User.isClientUser(ownerInfo)) {
                        resp.ownerInfo = ownerInfo;
                        resp.invalidMsg = null;
                    } else {
                        resp.ownerInfo = null;
                        resp.invalidMsg = "Proprietário não pode ser um funcionário";
                    }
                } else {
                    self.ownerInfo = null;
                    self.invalidMsg = "Proprietário não cadastrado";
                }

                if (typeof callback == 'function')
                    callback(resp);
            })
        };

        var insertProperty = function(propertyInfo) {
            return new Promise(function(resolve, reject) {
                var dataStore = $kinvey.DataStore.collection('Properties');
                dataStore.save(propertyInfo).then(function(property) {
                    resolve(property);
                }).catch(function(error) {
                    reject(error);
                });
            });
        };

        return {
            loadOwnerInfo: loadOwnerInfo,
            insertProperty: insertProperty,
        };

    }]);