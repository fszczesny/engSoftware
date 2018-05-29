'use strict';

module.exports = function(app) {
    var user = require('../controllers/users');
    
    app.route('/api/user')
                .post(user.signUp);

    app.route('/api/user/:userId')
                .get(user.getUserById)
                .put(user.updateUser);

    app.route('/api/user/login')
            .post(user.logIn);

    app.route('/api/user/check-exist')
            .post(user.checkExist);

    app.route('/api/user/lookup')
            .post(user.lookUpUser);

}