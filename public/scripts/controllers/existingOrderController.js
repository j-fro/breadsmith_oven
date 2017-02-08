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

        $scope.viewOrder = function(order) {
            $scope.viewedOrder = order;
        };

        $scope.removeProduct = function(product) {
            $scope.viewedOrder.products.splice(
                $scope.viewedOrder.products.indexOf(product),
                1
            );
        };

        $scope.updateOrder = function() {
            $http
                .put('/order', $scope.viewedOrder)
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(err) {
                    console.log(err);
                });
        };
    }
]);
