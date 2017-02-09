myApp.controller('NavController', [
    '$scope',
    '$window',
    '$firebaseAuth',
    'AuthFactory',
    function($scope, $window, $firebaseAuth, AuthFactory) {
        console.log('NavController');
        $scope.auth = AuthFactory;
        // $scope.auth.getRole();
        // var auth = $firebaseAuth();

        $scope.logout = AuthFactory.logOut;
        // $scope.logout = function() {
        //     auth
        //         .$signOut()
        //         .then(function() {
        //             $window.location.href = '#!/login';
        //         })
        //         .catch(function(err) {
        //             console.log(err);
        //         });
        // };
    }
]);
