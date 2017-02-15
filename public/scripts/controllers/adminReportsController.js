myApp.controller('adminReportsController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {
        console.log('in adminReportsController');
        $scope.startDate = new Date();
        $scope.endDate = new Date();
        $scope.popup = {
            opened: false
        };
        $scope.toggle = function() {
            $scope.popup.opened = !$scope.popup.opened;
        };
    }
]);
