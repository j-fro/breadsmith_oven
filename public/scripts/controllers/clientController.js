myApp.controller('clientController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in clientController');
        $scope.XYZ = function() {
            $http({
                method: 'GET',
                url: '/',
                data: XYZ
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };
    }
]);
