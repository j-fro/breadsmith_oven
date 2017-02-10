myApp.controller('adminProductController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log("NG");
        console.log('in adminProductController');

        $scope.addProduct = function() {
            var data = {
                type: 'French bread',
                variety: '1/2" slice',
                price: 3.65
            };
            $http({
                method: 'POST',
                url: '/product',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.updateProduct = function() {
            var data = {
                id: 32,
                price: 3.75
            };
            $http({
                method: 'PUT',
                url: '/product',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.deleteProduct = function() {
            $http({
                method: 'DELETE',
                url: '/product/:id',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };
    } //end
]);