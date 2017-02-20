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
        $scope.page = {};

        $scope.selectNav = function(page) {
            Object.keys($scope.page).forEach(function(key) {
                $scope.page[key] = false;
            });
            $scope.page[page] = true;
            console.log($scope.page);
        };

        //-- navbar collapsing controls --//
        $scope.isNavCollapsed = true;
        $scope.isCollapsed = false;
        $scope.isCollapsedHorizontal = false;
    }
]);
