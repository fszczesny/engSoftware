'use strict';

angular
    .module('user')
    .factory('SignUpService', ['UserService', 'UserSession', '$http', function(UserService, UserSession, $http) {
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

        /*
         * Inserts new user into database
         */
        var createUser = function(userData) {
            return new Promise(function(resolve, reject) {
                checkUserExists(userData.username).then(function(userExists) {
                    if (!userExists) {
                        $http
                            .post('/api/user', userData)
                            .then(function(resp) {
                                var userData = resp.data;
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

        /*
         * Sets current user session to create user
         */
        var logIn = function(userData) {
            UserSession.setSession(userData);
            UserService.update();
        }

        /*
         * Creates user and log in to create account
         */
        var signUp = function(userData) {
            return new Promise(function(resolve, reject) {
                createUser(userData).then(function(userData) {
                    logIn(userData);
                    resolve(userData);
                }).catch(function(error) {
                   reject({
                       msg: 'ERRO: Não foi possível cadastrar o usuário'
                   });
                });
            });
        };

        return {
            signUp: signUp,
            createUser: createUser,
            checkUserExists: checkUserExists,
        };
    }]);