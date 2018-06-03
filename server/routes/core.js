'use strict';

module.exports = function(app) {

    var core = require('../controllers/core');

    app.route('/api/core/file')
            .post(core.uploadFile);

    app.route('/api/core/file/:fileKey')
            .delete(core.deleteFile);
};