angular
    .module('user')
    .factory('SignUpService', ['User', 'UserSession', '$http', function(User, UserSession, $http) {
        var checkUserExists = function(username) {
            return new Promise(function(resolve, reject) {
                $http
                    .post('/api/user/check-exist', {
                        username: username
                    }).then(function(resp) {
                        resolve(resp.data.userExists);
                    }).catch(function(error) {
                        console.log('Error', error);
                        reject(error);
                    });
            });
        };

        var signUp = function(userData) {
            return new Promise(function(resolve, reject) {
                checkUserExists(userData.username).then(function(userExists) {
                    if (!userExists) {
                        $http
                            .post('/api/user', userData)
                            .then(function(resp) {
                                // Log In
                                var userData = resp.data;
                                UserSession.setSession(userData);
                                User.update();
                                resolve(userData);
                            }).catch(function(error) {
                                console.log('Error', error);
                                reject({
                                    msg: 'ERRO: Não foi possível cadastrar o usuário'
                                })
                            });
                    } else {
                        reject({
                            msg: 'Usuário já cadastrado'
                        });
                    }
                }).catch(function(error) {
                   reject({
                       msg: 'ERRO: Não foi possível verificar existência do usuário'
                   });
                });

            });
        };

        return {
            signUp: signUp,
            checkUserExists: checkUserExists,
        };
    }]);