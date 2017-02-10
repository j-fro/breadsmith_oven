angular.module('packingApp', []).controller('PackingListController', [
    '$scope',
    '$window',
    function($scope, $window) {
        $scope.orders = JSON.parse(localStorage.getItem('orders'));
        $window.print();
        setTimeout($window.close, 500);
    }
]);
