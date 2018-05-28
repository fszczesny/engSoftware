'use strict';

module.exports = function(app) {
    var user = require('../controllers/users');
    
    app.route('/api/user')
                .post(user.signUp);

    app.route('/api/user/:userId')
                .get(user.getUser)
                .put(user.updateUser)
                .delete(user.deleteUser);

    app.route('/api/user/login')
            .post(user.logIn);

    app.route('/api/user/check-exist')
            .post(user.checkExist);

}