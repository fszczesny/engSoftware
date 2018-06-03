angular
    .module('property')
    .factory('InsertSaleService', ['File', function(File) {
        
        var uploadContract = function(file) {
            return File.upload(file, '.pdf');
        };

        var removeContract = function(fileUrl) {
            return File.delete(fileUrl);
        };

        return {
            uploadContract: uploadContract,
            removeContract: removeContract,
        };

    }]);