var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ngDialog']);
console.log('NG');
myApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/adminHome', {
                templateUrl: 'views/admin/adminHome.html',
                controller: 'adminController'
            })
            .when('/newOrder', {
                templateUrl: 'views/admin/newOrder.html',
                controller: 'adminNewOrderController'
            })
            .when('/existingOrders', {
                templateUrl: 'views/admin/existingOrders.html',
                controller: 'ExistingOrderController'
            })
            .when('/reports', {
                templateUrl: 'views/admin/reports.html',
                controller: 'adminReportsController'
            })
            .when('/customers', {
                templateUrl: 'views/admin/customers.html',
                controller: 'adminCustomerController'
            })
            .when('/products', {
                templateUrl: 'views/admin/products.html',
                controller: 'productRead'
            })
            .when('/staff', {
                templateUrl: 'views/admin/staff.html',
                controller: 'adminController'
            })
            // .when("/newProduct", {
            //   templateUrl: 'views/Admin/createProduct.html',
            //   controller : 'adminController'
            // })
            //
            // .when("/editProduct", {
            //   templateUrl: 'views/Admin/editProduct.html',
            //   controller : 'adminController'
            // })
            // .when("/editOrder", {
            //   templateUrl: 'views/Admin/editOrder.html',
            //   controller : 'adminController'
            // })
            //
            //

            .when('/customer', {
                templateUrl: 'views/customer/customerHome.html',
                controller: 'adminController'
            })
            .when('/editCustomer', {
                templateUrl: 'views/admin/editCustomer.html',
                controller: 'adminCustomerController'
            })
            .otherwise({
                redirectTo: 'home'
            });
    }
]);

myApp.controller('indexController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {
        console.log('in index controller');

        $scope.login = function() {
            $http({
                method: 'GET',
                url: '/login'
            }).then(
                function successCallback(response) {
                    console.log(response);
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };

        $scope.logout = function() {
            $http({
                method: 'GET',
                url: '/logout'
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $window.location.href = '/';
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };
    }
]);
