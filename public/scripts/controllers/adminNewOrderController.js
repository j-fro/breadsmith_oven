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

        $scope.postOrder = function() {
            var newOrder = {
                comments: $scope.comments,
                customer_id: $scope.selectedCustomer.id,
                products: $scope.selectedCustomer.products,
                status: true
            };
            $http.post('/order', newOrder).then(function(response) {
                console.log('order Post hit');
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

        $scope.selectCustomerModal = function() {
            var dialog = ngDialog.open({
                template: 'selectCustomer',
                controller: 'adminNewOrderController',
                scope: $scope
            });

            dialog.closePromise.then(function(data) {
                $scope.selectedCustomer = data.value;
            });
        };
    }
]); //end clientController
