myApp.controller('ExistingOrderController', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.getOrders = function() {
            $http
                .get('/order/' + $scope.dateSelected)
                .then(function(response) {
                    console.log(response);
                    $scope.orders = response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        };
    }
]);
