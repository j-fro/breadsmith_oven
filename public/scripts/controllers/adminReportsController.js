myApp.controller('adminReportsController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in adminReportsController');

        $scope.invoiceReport = function() {
            $http({
                method: 'GET',
                url: '/reports/invoice',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.productionReport = function() {
            $http({
                method: 'GET',
                url: '/reports/production',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

    }
]);
