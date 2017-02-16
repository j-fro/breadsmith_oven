myApp.controller('NavController', [
    '$scope',
    '$window',
    '$firebaseAuth',
    'AuthFactory',
    function($scope, $window, $firebaseAuth, AuthFactory) {
        console.log('NavController');
        $scope.auth = AuthFactory;
        $scope.logout = AuthFactory.logOut;
        $scope.name = $scope.auth._State.name;

        //-- navbar collapsing controls --//
        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
}]);
