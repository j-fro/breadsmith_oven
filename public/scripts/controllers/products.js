myApp.controller("productRead", ["$scope", "$http", "$window", function($scope, $http, $window){
  var show = false;
  $scope.show = show;
    console.log("Products page");
    var array = ["one", "two", "three"];
    $scope.list = array;
    $scope.getProducts = function(){
      $http({
        method:"GET",
        url:"/product"
      }).then(function(res){
        console.log(res.data);
        array = res.data;
        $scope.list = array;
        show = true;
        $scope.show = show;
      });
    };
}]);
