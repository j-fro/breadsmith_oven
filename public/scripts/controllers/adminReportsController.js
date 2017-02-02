
myApp.controller('adminReportsController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in adminReportsController');
        $scope.XYZ = function() {
            $http({
                method: 'POST',
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
