angular.module('packingApp', []).controller('PackingListController', [
    '$scope',
    '$window',
    function($scope, $window) {
        $scope.today = new Date();
        $scope.orders = JSON.parse(localStorage.getItem('orders'));

        $window.print();
        setTimeout($window.close, 400);

        $scope.getProductTotals = function() {
            $scope.productTotals = [];
            $scope.orders.forEach(function(order) {
                order.products.forEach(function(product) {
                    var existing = $scope.productTotals.find(function(x) {
                        if (
                            x.type === product.type &&
                            x.variety === product.variety
                        ) {
                            return true;
                        }
                        return false;
                    });
                    if (existing) {
                        existing.qty += product.qty;
                    } else {
                        $scope.productTotals.push(product);
                    }
                });
            });
            console.log('Product totals:', $scope.productTotals);
        };

        $scope.init = function() {
            $scope.getProductTotals();
        };
    }
]);
