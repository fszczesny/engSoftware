'use strict';

angular
    .module('user')
    .factory('SignUpService', ['UserService',
                               'UserSession',
                               'UsersAPI',
                               function(UserService, UserSession, UsersAPI) {

        var checkUserExists = function(username) {
            return new Promise(function(resolve, reject) {
                UsersAPI.checkExists({
                    username: username
                }).$promise.then(function(resp) {
                    resolve(resp.userExists);
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
                        UsersAPI.create(userData).$promise.then(function(resp) {
                            var userData = resp.userData;
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
                       msg: 'ERRO: Não foi possível verificar a disponibilidade do usuário'
                   });
                });

            });
        };

        /*
         * Sets current user session to create user
         */
        var logInWithData = function(userData) {
            UserSession.setSession(userData);
            UserService.update();
        }

        /*
         * Creates user and log in to create account
         */
        var signUp = function(userData) {
            return new Promise(function(resolve, reject) {
                createUser(userData).then(function(userData) {
                    logInWithData(userData);
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