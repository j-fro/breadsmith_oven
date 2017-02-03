myApp.controller('adminController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in adminController');
        var data = "data";
        $scope.data = function() {
            $http({
                method: 'POST',
                url: '/',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };
    }
]);
