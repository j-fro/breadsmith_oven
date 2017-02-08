myApp.controller("productRead", ["$scope", "$http", "$window", function($scope, $http, $window){
  var show = false;
  $scope.show = show;//hides the list before fetching(Will remove later)
    console.log("Products page");
    var array = ["one", "two", "three"];
    $scope.getProducts = function(){
      $http({
        method:"GET",
        url:"/product"
      }).then(function(res){
        array = res.data;
        $scope.list = array;//puts the products on the page
        show = true;//prepares the list to be shown
        $scope.show = show;//And shows it
      });//end get call
    };//end getProducts

  $scope.editProduct = function(){
    console.log("editing");
    console.log(this);
    var obj = {
      id : this.product.id,
      type: "aifferent"
    };
    $http({
      method:"PUT",
      url:"/product",
      data:obj
    }).then(function(res){
      console.log(res);
    });//end http call
    $scope.getProducts();
  };//end editProduct
  $scope.deleteProduct = function(){
    console.log("deleting");
    console.log(this);
    var delObj = this.product.id;
    $http({
      method:"DELETE",
      url : "/product/" + delObj ,
      data : delObj
    }).then(function(res){
      console.log(res);
    });//end http
    $scope.getProducts();
  };//end delete
  $scope.getProducts();
}]);
