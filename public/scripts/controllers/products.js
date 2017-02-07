myApp.controller("productRead", ["$scope", "$http", "$window", function($scope, $http, $window){
    console.log("Products page");
    var array = ["one", "two", "three"];
    $scope.list = array;
    $scope.prodmod = function(){
      console.log("lol");
    };
}]);
