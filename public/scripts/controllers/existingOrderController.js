myApp.controller('ExistingOrderController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {
        $scope.getOrders = function() {
            $http
                .get('/order/' + $scope.dateSelected.toDateString())
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
            $scope.mailLink = 'mailto:' +
                order.email +
                '?subject=' +
                order.customer_name +
                ': Regarding your order #' +
                order.id +
                '&body=' +
                'Dear ' +
                order.contact_name +
                ',\n\n';
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

        $scope.printPackingList = function() {
            if ($scope.orders) {
                var orders = $scope.orders.filter(x => x.include);
                localStorage.setItem('orders', JSON.stringify(orders));
                $window.open('/views/admin/packingList.html');
            }
        };

        $scope.printPackingSlips = function() {};

        $scope.dateSelected = new Date();
        $scope.popup = {
            opened: false
        };
        $scope.toggle = function() {
            $scope.popup.opened = !$scope.popup.opened;
        };
    }
]);
