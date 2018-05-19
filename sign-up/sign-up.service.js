angular
    .module('signUp')
    .factory('SignUpService', ['$kinvey', function($kinvey) {
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
                    console.log(user);
                    alert('Usuário cadastrado e logado')
                    goToHomePage();
                  }).catch(function(error) {
                    if (error.code == 409) {
                        alert('Usuário já existe');
                        goToHomePage();
                    }
                  });
            }
        };
        return SignUp;
    }]);