var myApp = angular.module('myApp', ['ngRoute', 'firebase', 'ngDialog']);
console.log('NG');
myApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/admin/home', {
                templateUrl: 'views/admin/adminHome.html'
                // controller: 'adminController'
            })
            .when('/admin/newOrder', {
                templateUrl: 'views/admin/newOrder.html'
                // controller: 'adminController'
            })
            .when('/admin/existingOrders', {
                templateUrl: 'views/admin/existingOrders.html',
                controller: 'ExistingOrderController'
            })
            .when('/admin/reports', {
                templateUrl: 'views/admin/reports.html',
                controller: 'adminReportsController'
            })
            .when('/admin/customers', {
                templateUrl: 'views/admin/customers.html',
                controller: 'adminCustomerController'
            })
            .when('/admin/products', {
                templateUrl: 'views/admin/products.html',
                controller: 'productRead'
            })
            .when('/admin/staff', {
                templateUrl: 'views/admin/staff.html',
                controller: 'adminStaffController'
            })
            .when('/customer/home', {
                templateUrl: 'views/customer/customerHome.html',
                controller: 'CustomerController'
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController'
            })
            .otherwise({
                redirectTo: 'login'
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
