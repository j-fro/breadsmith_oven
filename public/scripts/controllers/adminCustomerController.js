myApp.controller('adminCustomerController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log("NG");
        console.log('in adminCustomerController');

        $scope.productToBeAdded = [];

        $scope.viewProduct = function() {
            $http({
                method: 'GET',
                url: '/product', //or url: '/product/id',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.permitted_products = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.addProductToCustomer = function(product) {
            $scope.productToBeAdded.push(product);
            console.log("product added");
            alert("product added");
        };

        $scope.searchProduct = function() {
            var searchProductBox = $scope.searchProductBox;
            $http({
                method: 'GET',
                url: '/product', //or url: '/product/id',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.permitted_products = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.searchCustomer = function() {
            var searchCustomerBox = $scope.searchCustomerBox;
            $scope.customers = [];
            $http({
                method: 'GET',
                url: '/customer', //or url: '/customer/id',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.viewCustomer = function() {
            $http({
                method: 'GET',
                url: '/customer', //or url: '/customer/id',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.customers = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.addCustomer = function() {
            var data = {
                name: $scope.customerName,
                address: $scope.customerAddress,
                products: $scope.productToBeAdded
            };
            console.log("data:", data);
            $http({
                method: 'POST',
                url: '/customer',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
                alert("New Customer Added");
                $window.location.reload();
            }, function errorCallback(error) {
                console.log('error', error);
            });
        }; //end addNewCustomer

        $scope.editCustomer = function(customer) {
            $scope.customerToEdit = JSON.parse(JSON.stringify(customer));
        };

        $scope.updateCustomer = function() {
            var data = $scope.customerToEdit;
            console.log("data:", data);
            $http({
                method: 'PUT',
                url: '/customer',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
                alert("Customer Updated");
                $window.location.reload();
            }, function errorCallback(error) {
                console.log('error', error);
            });
        }; //end updateExistingCustomer

        $scope.deleteCustomer = function(customer) {
            $http({
                method: 'DELETE',
                url: '/customer/' + customer.id,
            }).then(function successCallback(response) {
                console.log(response);
                $window.location.reload();
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

    } //end
]);