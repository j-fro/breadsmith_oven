var customerApp = angular.module('customerApp', ['ngRoute', 'ngDialog', 'firebase']);
// "ui.bootstrap.modal"
customerApp.controller('CustomerController', ['$scope', 'ngDialog', '$http', '$window', '$firebaseAuth',
    function($scope, ngDialog, $http, $window, ModalService, $firebaseAuth) {
        console.log('in clientController');
        var auth = $firebaseAuth;
        $scope.displayOrder = function() {
            $http.get('/customer/46')
            .then(function successCallback(response) {
                console.log('displayOrder', response);
                $scope.customer = response.data;
            }, function errorCallback(error) {
                console.log('displayOrder error', error);
                $window.location.href='#!/login';
            });
          };

        $scope.displayOrder();

        $scope.postOrder = function(){
          var newOrder = {
            status: 'placed',
            comments: $scope.comments,
            customer_id: $scope.customer.id,
            products: $scope.customer.products
          };
        $http.post('/order', newOrder)
        .then(function(response){
          console.log('order Post hit');

          });


        };

        $scope.confirmModal = function(){
          ngDialog.open({
            template: 'confirmOrder'
          });
        };

        $scope.logout = function(){
          auth.$signOut().then(function(){
            console.log('logging the user out!');
            $window.location.href = '/';
          });
        };

}]);//end clientController
