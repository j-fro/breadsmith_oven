var customerApp = angular.module('customerApp', []);

customerApp.controller('CustomerController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in clientController');
        $scope.displayOrder = function() {
            $http.get('/customer/46')
            .then(function successCallback(response) {
                console.log('displayOrder', response);
                $scope.customer = response.data;
            }, function errorCallback(error) {
                console.log('displayOrder error', error);
                $window.location.href='#!/login';
            });
          };
        // };$scope.checkLogin();
        $scope.displayOrder();

        $scope.postOrder = function(){
          var newOrder = {
            status: 'placed',
            comments: $scope.comments,
            customer_id: $scope.customer.id,
            products: $scope.customer.products
          };
        $http.post('/order', newOrder)
        .then(function(response){
          console.log('order Post hit');

          if(confirm("Thank you! Your order has been submitted. You will be notified when it has been accepted.")){
            $window.location.href = '#!/home';
          }
        });

        };

    }
]);//end clientController
