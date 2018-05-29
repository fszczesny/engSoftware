'use strict';

module.exports = function(app) {

    var core = require('../controllers/core');

    app.route('/api/core/upload-img')
            .post(core.uploadImg);

};