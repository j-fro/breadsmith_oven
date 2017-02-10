var myApp = angular.module('myApp', [
    'ngAnimate',
    'ngRoute',
    'ngDialog',
    'firebase',
    'ui.bootstrap'
]);
console.log('NG');
myApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/admin/home', {
                templateUrl: 'views/admin/adminHome.html',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/newOrder', {
                templateUrl: 'views/admin/newOrder.html',
                controller: 'adminNewOrderController',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/existingOrders', {
                templateUrl: 'views/admin/existingOrders.html',
                controller: 'ExistingOrderController',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/reports', {
                templateUrl: 'views/admin/reports.html',
                controller: 'adminReportsController',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/customers', {
                templateUrl: 'views/admin/customers.html',
                controller: 'adminCustomerController',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/products', {
                templateUrl: 'views/admin/products.html',
                controller: 'productRead',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/staff', {
                templateUrl: 'views/admin/staff.html',
                controller: 'adminStaffController',
                resolveRedirectTo: function(AuthFactory) {
                    console.log('Resolving');
                    return AuthFactory.requireAdmin('/admin/products');
                }
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
