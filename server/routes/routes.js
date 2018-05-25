'use strict';

module.exports = function(app) {
    var user = require('../controllers/user');
    
    app.route('/api/user')
            .get(user.getAll)
            .post(user.createUser);

    app.route('/api/user/login')
            .post(user.logIn);

}