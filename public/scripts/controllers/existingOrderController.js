myApp.controller('ExistingOrderController', [
    '$scope',
    '$http',
    function($scope, $http) {
        $scope.getOrders = function() {
            $http
                .get('/order/' + $scope.dateSelected)
                .then(function(response) {
                    console.log(response);
                    $scope.orders = response.data.map(ord => {
                        ord.created = new Date(ord.created);
                        return ord;
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
        };
    }
]);
