myApp.controller('adminReportsController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {
        console.log('in adminReportsController');
        $scope.startDate = moment();
        $scope.endDate = moment();
        $scope.popup = {
            opened: false
        };
        $scope.toggle = function() {
            $scope.popup.opened = !$scope.popup.opened;
        };
    }
]);
