var myApp = angular.module('myApp', []);
console.log("NG");

myApp.controller('adminCustomerController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in adminCustomerController');

        $scope.viewCustomer = function() {
            $http({
                method: 'GET',
                url: '/customer', //or url: '/customer/id',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.addCustomer = function() {
            var data = {
                name: "Frank's Hotel",
                address: "221 Hotel Ave, Hotelville MN 55123",
                email: ['frank@franks.com'],
                permitted_products: [{
                        id: 2,
                        regular: true
                    },
                    {
                        id: 17,
                        regular: true
                    },
                    {
                        id: 24,
                        regular: false
                    }
                ]
            };
            $http({
                method: 'POST',
                url: '/customer',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        }; //end addNewCustomer

        $scope.updateCustomer = function() {
            var data = {
                id: 7,
                name: "Frank's Grand Hotel",
                permitted_products: [{
                        id: 2,
                        regular: true
                    },
                    {
                        id: 17,
                        regular: false
                    },
                    {
                        id: 24,
                        regular: true
                    },
                    {
                        id: 32,
                        regular: false
                    }
                ]
            };
            $http({
                method: 'PUT',
                url: '/customer',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        }; //end updateExistingCustomer

        $scope.deleteCustomer = function() {
            $http({
                method: 'DELETE',
                url: '/customer/:id',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.viewProduct = function() {
            $http({
                method: 'GET',
                url: '/product', //or url: '/product/id',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

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

        $scope.viewUser = function() {
            http({
                type: 'GET',
                url: '/user',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.addUser = function() {
            var data = {
                email: 'frank@franks.com',
                name: 'Frank Bank'
            };
            http({
                type: 'POST',
                url: '/user',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.updateUser = function() {
            var data = {
                id: 2,
                name: 'Franklin Bank'
            };
            http({
                method: 'PUT',
                url: '/user',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.deleteUser = function() {
            http({
                method: 'DELETE',
                url: '/user/:id',
                data: data,
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

    } //end
]);
