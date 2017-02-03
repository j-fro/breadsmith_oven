myApp.controller('clientController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in clientController');
        $scope.displayOrder = function() {
            $http.get('/order')
            .then(function successCallback(response) {
                console.log(response);
                $scope.products = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };
    }
]);

  // $scope.order = {
  //   product: $scope.product.name,
  //   quantity: $scope.product.quantity
  // };
