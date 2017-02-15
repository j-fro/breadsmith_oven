var myApp = angular.module('myApp', [
    'ngAnimate',
    'ngRoute',
    'ngDialog',
    'firebase',
    'ui.bootstrap',
    'ngFileUpload'
]);
console.log('NG');
myApp.config([
    '$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/admin/home', {
                templateUrl: 'views/admin/adminHome.html',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/home');
                }
            })
            .when('/admin/newOrder', {
                templateUrl: 'views/admin/newOrder.html',
                controller: 'adminNewOrderController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/newOrder');
                }
            })
            .when('/admin/existingOrders', {
                templateUrl: 'views/admin/existingOrders.html',
                controller: 'ExistingOrderController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/existingOrders');
                }
            })
            .when('/admin/reports', {
                templateUrl: 'views/admin/reports.html',
                controller: 'adminReportsController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/reports');
                }
            })
            .when('/admin/customers', {
                templateUrl: 'views/admin/customers.html',
                controller: 'adminCustomerController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/customers');
                }
            })
            .when('/admin/products', {
                templateUrl: 'views/admin/products.html',
                controller: 'productRead',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/products');
                }
            })
            .when('/admin/staff', {
                templateUrl: 'views/admin/staff.html',
                controller: 'adminStaffController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/staff');
                }
            })
            .when('/admin/import', {
                templateUrl: 'views/admin/import.html',
                controller: 'ImportController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireAdmin('/admin/import');
                }
            })
            .when('/customer/home', {
                templateUrl: 'views/customer/customerHome.html',
                controller: 'CustomerController',
                resolveRedirectTo: function(AuthFactory) {
                    return AuthFactory.requireCustomer('/customer/home');
                }
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
