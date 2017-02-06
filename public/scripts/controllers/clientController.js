myApp.controller('clientController', ['$scope', '$http', '$window',
    function($scope, $http, $window) {
        console.log('in clientController');
        $scope.displayOrder = function() {
            $http.get('/order')
            .then(function successCallback(response) {
                console.log('displayOrder', response);
                $scope.products = response.data;
            }, function errorCallback(error) {
                console.log('displayOrder error', error);
                $window.location.href='#!/login';
            });
        };$scope.checkLogin();

        $http.postOrder = function(){
          var newOrder = {


          };
        $http.post('/order', newOrder)
        .then(function(response){
          console.log('order Post hit');

          if(confirm("Thank you! Your order has been submitted. You will be notified when it has been accepted.")){
            $window.location.href = '#!/home';
          }
        });

        };

    }
]);//end clientController
