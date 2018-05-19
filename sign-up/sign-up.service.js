angular
    .module('user')
    .factory('SignUpService', ['$kinvey', 'User', function($kinvey, User) {
        var signUp = function(userInfo, callback) {
            var username = userInfo.cpf;

            var promise = $kinvey.User.signup({
                username: username,
                password: userInfo.password,
                // Extra attributes
                name: userInfo.name,
                phone: userInfo.phone,
                address: userInfo.address,
                email: userInfo.email
            });
              
            promise.then(function(user) {
                // User is signed up and logged in
                console.log(user);
                User.update();
                if (typeof callback == 'function')
                    callback(user);
            }).catch(function(error) {
                if (error.code == 409) {
                    alert('Usuário já existe');
                } else {
                    alert('Erro no cadastro');
                }
                if (typeof callback == 'function')
                    callback(error);
            });
        };

        return {
            signUp: signUp
        };
    }]);