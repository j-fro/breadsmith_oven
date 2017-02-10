myApp.controller('adminStaffController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in adminStaffController');
        $scope.XYZ = function() {
            $http({
                method: 'POST',
                url: '/',
                data: XYZ
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
    }
]);
