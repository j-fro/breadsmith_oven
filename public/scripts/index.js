var myApp = angular.module('myApp', ['ngRoute']);
console.log("NG");
myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when("/admin", {
    templateUrl: 'views/admin/adminHome.html',
    controller : 'adminController'
  })
  .when("/viewCustomer", {
    templateUrl: 'views/admin/viewCustomer.html',
    controller: 'adminCustomerController'
  })
  .when("/addCustomer", {
    templateUrl: 'views/admin/addCustomer.html',
    controller: 'adminCustomerController'
  })
  .when("/editCustomer", {
    templateUrl: 'views/admin/editCustomer.html',
    controller: 'adminCustomerController'
  })
  .when("/newProduct", {
    templateUrl: 'views/admin/newProduct.html',
    controller : 'adminController'
  })
  .when("/newOrder", {
    templateUrl: 'views/admin/createOrder.html',
    controller : 'adminController'
  })
  .when("/editProduct", {
    templateUrl: 'views/admin/editProduct.html',
    controller : 'adminController'
  })
  .when("/editOrder", {
    templateUrl: 'views/admin/editOrder.html',
    controller : 'adminController'
  })
  .when("/product", {
    templateUrl: 'views/admin/product.html',
    controller : 'adminController'
  })
  .when("/orders", {
    templateUrl: 'views/admin/orders.html',
    controller : 'adminController'
  })
  .when("/reports", {
    templateUrl: 'views/admin/reports.html',
    controller : 'adminController'
  })
  .when("/staff", {
    templateUrl: 'views/admin/staff.html',
    controller : 'adminController'
  })
  .otherwise({
    redirectTo : "/index.html"
  });

}]);

myApp.controller('indexController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in index controller');

        $scope.login = function() {
            $http({
                method: 'GET',
                url: '/login',
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

        $scope.logout = function() {
            $http({
                method: 'GET',
                url: '/logout',
            }).then(function successCallback(response) {
                console.log(response);
                  $window.location.href = '/';
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };

    }
]);
