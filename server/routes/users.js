'use strict';

module.exports = function(app) {
    var user = require('../controllers/users');
    
    app.route('/api/user')
                .get(user.getAllUsers)
                .post(user.createUser);

    app.route('/api/user/:userId')
                .get(user.getUser)
                .put(user.updateUser)
                .delete(user.deleteUser);

    app.route('/api/user/login')
            .post(user.logIn);

}