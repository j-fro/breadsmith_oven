myApp.controller('adminReportsController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {
        console.log('in adminReportsController');
        $scope.productionDate = new Date();
        $scope.popup = {
            opened: false
        };
        $scope.toggle = function() {
            $scope.popup.opened = !$scope.popup.opened;
        };
        $scope.productionLink = 'report/production/' +
            $scope.productionDate.toString();

        $scope.invoiceReport = function() {
            $http({
                method: 'GET',
                url: '/reports/invoice'
            }).then(
                function successCallback(response) {
                    console.log(response);
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };

        $scope.productionReport = function() {
            $http({
                method: 'GET',
                url: '/report/production/' + '2017-01-26'
            }).then(
                function successCallback(response) {
                    console.log(response);
                    print(response.data);
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };
    }
]);
