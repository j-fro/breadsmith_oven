myApp.controller('ExistingOrderController', [
    '$scope',
    '$http',
    '$window',
    'ngDialog',
    function($scope, $http, $window, ngDialog) {
        $scope.init = function() {
            $scope.mailMessage = 'Your order has been confirmed!';
            $scope.dateSelected = new Date();
            $scope.checkAll = true;
            $scope.getOrders();
            $scope.popup = {
                opened: false
            };
        };

        $scope.getOrders = function() {
            $http
                .get('/order/' + $scope.dateSelected.toDateString())
                .then(function(response) {
                    console.log(response);
                    $scope.orders = response.data.map(ord => {
                        ord.created = new Date(ord.created);
                        ord.include = true;
                        return ord;
                    });
                })
                .catch(function(err) {
                    console.log(err);
                });
        };

        $scope.viewOrder = function(order) {
            $scope.viewedOrder = order;
            $scope.orderEditForm.$setPristine();
            $scope.isDisabled = false;
        };

        $scope.removeProduct = function(product) {
            $scope.viewedOrder.products.splice(
                $scope.viewedOrder.products.indexOf(product),
                1
            );
            $scope.isDisabled = true;

          };



        $scope.updateOrder = function() {
            $scope.viewedOrder.include = undefined;
            $http
                .put('/order', $scope.viewedOrder)
                .then(function(response) {
                    console.log(response);
                    $scope.success = true;
                    $scope.modalBody = 'Updated Order successfully.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    $scope.getOrders();
                })
                .catch(function(err) {
                    console.log(err);
                    $scope.success = false;
                    $scope.modalBody = 'Sorry, there was an error. Please try again.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                });
        };

        $scope.confirmOrder = function() {
            $http
                .put('/order/confirm/' + $scope.viewedOrder.id)
                .then(function() {
                    $scope.viewedOrder.status = true;
                    $scope.sendMessage();
                })
                .catch(function(err) {
                    console.log(err);
                });
        };

        $scope.sendMessage = function() {
            var data = {
                orderId: $scope.viewedOrder.id,
                emailTo: [
                    $scope.viewedOrder.primary_email,
                    $scope.viewedOrder.secondary_email
                ],
                message: $scope.mailMessage
            };
            console.log(data);
            $http
                .post('/mail', {
                    orderId: $scope.viewedOrder.id,
                    emailTo: [
                        $scope.viewedOrder.primary_email,
                        $scope.viewedOrder.secondary_email
                    ],
                    message: $scope.mailMessage
                })
                .then(function() {
                    console.log('Successfully sent');
                    $scope.success = true;
                    $scope.modalBody = 'Your email was sent.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                })
                .catch(function(err) {
                    console.log(err);
                    $scope.success = false;
                    $scope.modalBody = 'Sorry, there was an error sending. Please try again.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                });
        };

        $scope.toggleAll = function() {
            $scope.orders.forEach(function(ord) {
                ord.include = $scope.checkAll;
            });
        };

        $scope.printPackingList = function() {
            if ($scope.orders) {
                var orders = $scope.orders.filter(x => x.include);
                localStorage.setItem('orders', JSON.stringify(orders));
                $window.open('/views/admin/pickingList.html');
            }
        };

        $scope.printPackingSlips = function() {
            if ($scope.orders) {
                var orders = $scope.orders.filter(x => x.include);
                localStorage.setItem('orders', JSON.stringify(orders));
                $window.open('/views/admin/packingList.html');
            }
        };

        $scope.mailMessage = 'Your order has been confirmed!';
        $scope.dateSelected = new Date();
        $scope.getOrders();
        $scope.popup = {
            opened: false
        };
        $scope.toggle = function() {
            $scope.popup.opened = !$scope.popup.opened;
        };
    }
]);
