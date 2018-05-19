angular
    .module('signUp')
    .factory('SignUpService', ['$kinvey', 'UserInfo', function($kinvey, UserInfo) {
        var goToHomePage = function() {
            window.location.hash = "#!/home";
        };

        var SignUp = {
            signUp: function(userInfo) {
                var username = userInfo.cpf;

                var promise = $kinvey.User.signup({
                    username: username,
                    password: userInfo.password,
                    // Extra attributes
                    name: userInfo.name,
                    phone: userInfo.phone,
                    address: userInfo.address,
                    email: userInfo.email
                  })
                  
                  promise.then(function(user) {
                    // User is signed up and logged in
                    console.log(user);
                    UserInfo.update();
                    goToHomePage();
                  }).catch(function(error) {
                    if (error.code == 409) {
                        alert('Usuário já existe');
                        goToHomePage();
                    } else {
                        alert('Erro no cadastro');
                    }
                  });
            }
        };
        return SignUp;
    }]);