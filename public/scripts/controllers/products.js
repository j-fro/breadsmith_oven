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
    console.log("this is", this);
    var obj = {
      id : eObj.id.id,
      type : this.pName,
      variety : this.pVariety,
      price : this.pPrice
    };
    console.log("obj is", obj);
    $http({
      method : "PUT",
      url:"/product",
      data : obj
    }).then(function(res){
      console.log(res);
      $scope.pName = "";
      $scope.pVariety="";
      $scope.pPrice="";
      $scope.getProducts();
    });
    console.log(obj);
  };//end editProduct
  $scope.deleteProduct = function(){
    console.log("deleting");
    console.log(this);
    var delObj = this.product.id;
    $http({
      method:"DELETE",
      url : "/product/" + delObj,
      data : delObj
    }).then(function(res){
      console.log(res);
      $scope.getProducts();
    });//end http

  };//end delete
  $scope.getProducts();
  var eObj={};
  $scope.test = function(){
    console.log(this);
    console.log(eObj);

  };//end test
  $scope.storeInfo = function(){
    var x = this.product;
    eObj.id = x;
    $scope.pName = x.type;
    $scope.pVariety = x.variety;
    $scope.pPrice = x.price;
  };
}]);
