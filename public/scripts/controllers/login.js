myApp.controller('loginController', ['$scope', '$http', '$window', '$firebaseAuth',
    function($scope, $http, $window, $firebaseAuth) {
        console.log('in loginController');
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDpavDLXpfMuNVyTWal1RaQTAoK3KbzXao",
            authDomain: "breadsmith-50dc2.firebaseapp.com",
            databaseURL: "https://breadsmith-50dc2.firebaseio.com",
            storageBucket: "breadsmith-50dc2.appspot.com",
            messagingSenderId: "510935484126"
        };
        firebase.initializeApp(config);
        
        var provider = new firebase.auth.GoogleAuthProvider();

        $scope.login = function() {
            console.log('login button clicked');
            firebase.auth().signInWithPopup(provider)
            .then(function(firebaseUser){
              console.log('logged in user:', firebaseUser);
              alert('Logged in as' + ' ' + firebaseUser.user.displayName);
            }).catch(function(error){
              console.log('login failure:', error);
              alert('Login Error!');
              $window.location.href = '/';
            });
        }; //end $scope.login
    }
]); //end loginController
