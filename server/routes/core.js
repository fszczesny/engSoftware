'use strict';

module.exports = function(app) {

    var core = require('../controllers/core');

    app.route('/api/core/img')
            .post(core.uploadImg);

    app.route('/api/core/img/:imgKey')
            .delete(core.deleteImg);
};