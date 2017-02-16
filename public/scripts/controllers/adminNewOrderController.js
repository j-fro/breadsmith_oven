myApp.controller('adminNewOrderController', [
    '$scope',
    'ngDialog',
    '$http',
    '$window',
    function($scope, ngDialog, $http, $window) {
        $scope.getCustomers = function() {
            $http
                .get('/customer')
                .then(function(response) {
                    $scope.customers = response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        };

        $scope.pickCustomer = function(customer) {
            $scope.closeThisDialog(customer);
        };

        $scope.setRecurrance = function() {
            var days = Object.keys($scope.recur).filter(function(key) {
                return $scope.recur[key];
            });
            $http
                .post('/order/recurring', {
                    customer_id: $scope.selectedCustomer.id,
                    products: $scope.selectedCustomer.products,
                    days: days
                })
                .then(function(response) {
                    $scope.closeThisDialog();
                })
                .catch(function(err) {
                    console.log(err);
                });
        };

        $scope.postOrder = function() {
            var newOrder = {
                comments: $scope.comments,
                customer_id: $scope.selectedCustomer.id,
                products: $scope.selectedCustomer.products.map(p => {
                    p.qty *= p.multi;
                    return p;
                }),
                status: true
            };
            $http
                .post('/order', newOrder)
                .then(function(response) {
                    console.log('order Post hit');
                    $scope.confirmMessage = 'Your order has been submitted.';
                    $scope.confirmModal();
                })
                .catch(function(response) {
                    console.log('Error');
                    $scope.confirmMessage = 'There was an error and your order was not submitted';
                    $scope.confirmModal();
                });
        };

        $scope.confirmModal = function() {
            ngDialog.open({
                template: 'confirmOrder',
                controller: 'adminNewOrderController',
                scope: $scope
            });
        };

        $scope.ngDialog = ngDialog;
        
        $scope.selectCustomerModal = function() {
            var dialog = ngDialog.open({
                template: 'selectCustomer',
                controller: 'adminNewOrderController',
                scope: $scope
            });

            dialog.closePromise.then(function(data) {
                $scope.selectedCustomer = data.value;
                $scope.selectedCustomer.products.forEach(function(prod) {
                    prod.qty = 0;
                    prod.multi = '1';
                });
            });
        };

        $scope.recurringOrderModal = function() {
            var dialog = ngDialog.open({
                template: 'recurringOrder',
                controller: 'adminNewOrderController',
                scope: $scope
            });
        };
    }
]); //end clientController
