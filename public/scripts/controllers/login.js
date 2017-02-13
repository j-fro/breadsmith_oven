myApp.controller('LoginController', [
    '$scope',
    '$http',
    '$firebaseAuth',
    'AuthFactory',
    function($scope, $http, $firebaseAuth, AuthFactory) {
        console.log('in loginController');
        var auth = $firebaseAuth();
        var provider = new firebase.auth.GoogleAuthProvider();

        $scope.login = function() {
            console.log('login button clicked');
            firebase
                .auth()
                .signInWithPopup(provider)
                .then(function(firebaseUser) {
                    console.log('logged in user:', firebaseUser);
                })
                .catch(function(error) {
                    console.log('login failure:', error);
                    alert('Login Error!');
                });
        }; //end $scope.login

        auth.$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                firebaseUser.getToken().then(function(idToken) {
                    AuthFactory.setToken(idToken);
                    AuthFactory.getRole();
                });
            }
        });
    }
]); //end loginController
