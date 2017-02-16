myApp.controller('CustomerController', [
    '$scope',
    'ngDialog',
    '$http',
    '$window',
    '$firebaseAuth',
    'AuthFactory',
    function($scope, ngDialog, $http, $window, $firebaseAuth, AuthFactory) {
        console.log('in clientController');
        var auth = $firebaseAuth();
        $scope.logout = AuthFactory.logOut;
        var customerId = AuthFactory._State.customerId;
        $scope.displayOrder = function() {
            $http.get('/customer/' + customerId).then(function successCallback(
                response
            ) {
                console.log('displayOrder', response);
                $scope.customer = response.data;
                $scope.customer.products.forEach(function(prod) {
                    prod.qty = 0;
                    prod.multi = '1';
                });
            }, function errorCallback(error) {
                console.log('displayOrder error', error);
                $window.location.href = '#!/login';
            });
        };

        $scope.displayOrder();

        $scope.postOrder = function() {
            var newOrder = {
                comments: $scope.comments,
                customer_id: $scope.customer.id,
                products: $scope.customer.products.map(function(product) {
                    product.qty *= product.multi;
                    return product;
                })
            };
            $http.post('/order', newOrder).then(function(response) {
                console.log('order Post hit');
            });
        };

        $scope.confirmModal = function() {
            ngDialog.open({
                template: 'confirmOrder',
                controller: 'CustomerController'
            });
        };

        $scope.callForOrder = function() {
            return moment().hours() >= 14 && moment().hours() < 16;
        };

        $scope.placeForTomorrow = function() {
            return moment().hours() >= 16;
        };

        $scope.today = function() {
            return moment().hours(24).format('ll');
        };

        $scope.nextDay = function() {
            return moment().hours(48).format('ll');
        };
    }
]); //end clientController
