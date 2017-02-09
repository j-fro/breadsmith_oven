myApp.controller('adminReportsController', [
    '$scope',
    '$http',
    '$window',
    'AuthFactory',
    function($scope, $http, $window, AuthFactory) {
        console.log('in adminReportsController');
        AuthFactory.isAdmin();
        $scope.productionLink = 'report/production/' + '2017-01-26';
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
