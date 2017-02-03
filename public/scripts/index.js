var myApp = angular.module('myApp', []);
console.log("NG");

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
