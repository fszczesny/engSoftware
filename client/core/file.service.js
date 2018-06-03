angular
    .module('core')
    .factory('File', ['$http', function($http) {

        var upload = function(file, extension) {
            return new Promise(function(resolve, reject) {
                var fileReader = new FileReader();
                fileReader.onloadend = function(e) {
                    var fileData = fileReader.result;
                    var fileInfo = {
                        extension: extension,
                        base64: fileData
                    };

                    $http
                        .post('/api/core/file/', fileInfo)
                        .then(function(resp) {
                            var path = resp.data.url;
                            resolve(path);
                        }).catch(function(error) {
                            reject({
                                msg: "Não foi fazer upload do arquivo"
                            })
                        });
                };
                fileReader.readAsDataURL(file);
            });
        };

        var deleteFile = function(fileUrl) {
            return new Promise(function(resolve, reject) {
                var fileKey = fileUrl.split('/').pop();

                $http
                    .delete('/api/core/file/' + fileKey)
                    .then(function(resp) {
                        resolve(resp.data);
                    }).catch(function(error) {
                        reject({
                            msg: "Não foi deletar o arquivo"
                        });
                    });
            });
        }

        return {
            upload: upload,
            delete: deleteFile,
        }
    }]);