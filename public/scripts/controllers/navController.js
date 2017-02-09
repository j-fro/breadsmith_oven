myApp.controller('NavController', [
    '$scope',
    '$window',
    'AuthFactory',
    function($scope, $window, AuthFactory) {
        console.log('NavController');
        $scope.auth = AuthFactory;
    }
]);
