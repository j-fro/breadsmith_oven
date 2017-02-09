myApp.controller('adminStaffController', ['$scope', '$http', '$window', 'AuthFactory',
    function($scope, $http, $window, AuthFactory) {
        console.log('in adminStaffController');
        $scope.showStaff = function() {
            $http({
                method: 'GET',
                url: '/staff',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.staffView = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        };//end $scope.showStaff
      $scope.showStaff();

    $scope.editStaff = function(){
        console.log("editing", this);
        var obj = {
          id : this.id,
          first_name : x.firstName,
          last_name: $scope.xLastName,
          email : $scope.xEmail,
          role : $scope.xRole
        };
        console.log("obj is", obj);
        $http({
          method : "PUT",
          url:"/staff",
          data : obj
        }).then(function(res){
          console.log(res);
          $scope.first_name = "";
          $scope.last_name = "";
          $scope.email="";
          $scope.role="";
          $scope.showStaff();
        });
        console.log(obj);
      };//end editProduct

            $scope.storeStaff = function(){
              var x = this.staff;
              console.log('this is x', x);
              $scope.id = x.id;
              $scope.xFirstName = x.first_name;
              $scope.xLastName = x.last_name;
              $scope.xEmail = x.email;
              $scope.xRole = x.role;
            };
}]);
