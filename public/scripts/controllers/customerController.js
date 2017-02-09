myApp.controller('CustomerController', [
    '$scope',
    'ngDialog',
    '$http',
    '$window',
    '$firebaseAuth',
    function($scope, ngDialog, $http, $window, $firebaseAuth) {
        console.log('in clientController');
        var auth = $firebaseAuth();
        $scope.logout = function() {
            console.log('hit logout');
            auth
                .$signOut()
                .then(function() {
                    console.log('logging the user out!');
                    $window.location.href = '/';
                })
                .catch(function(err) {
                    console.log('oook an err', err);
                });
        };
        $scope.displayOrder = function() {
            $http.get('/customer/46').then(function successCallback(response) {
                console.log('displayOrder', response);
                $scope.customer = response.data;
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
                products: $scope.customer.products
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
    }
]); //end clientController
