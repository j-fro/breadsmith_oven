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
        console.log(res.data);
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
      type : this.editName,
      variety : this.editVariety,
      price : this.editPrice
    };
    console.log("obj is", obj);
    $http({
      method : "PUT",
      url:"/product",
      data : obj
    }).then(function(res){
      console.log(res);
      $scope.editName = "";
      $scope.editVariety="";
      $scope.editPrice="";
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
  };//end storeInfo
  $scope.newProduct = function(){
    var nObj = {
      type : $scope.newName,
      variety : $scope.newVariety,
      price : $scope.newPrice
    };
    $http({
      method : "POST",
      url : "/product",
      data: nObj
    }).then(function(res){
      console.log("Post call response", res);
      $scope.getProducts();
      $scope.newName = "";
      $scope.newVariety = "";
      $scope.newPrice = "";
    });
  };
}]);
