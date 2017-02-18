myApp.controller("productRead", ["$scope", "$http", "$window", "ngDialog", function($scope, $http, $window, ngDialog) {
  var show = false;
  $scope.show = show; //hides the list before fetching(Will remove later)
  console.log("Products page");

  $scope.getProducts = function() {
    $http({
      method: "GET",
      url: "/product"
    }).then(function(res) {
      console.log(res.data);
      array = res.data;
      $scope.list = res.data; //puts the products on the page
      show = true; //prepares the list to be shown
      $scope.show = show; //And shows it
    }); //end GET
  }; //end $scope.getProducts

  $scope.storeInfo = function(product) {
    $scope.productToEdit = JSON.parse(JSON.stringify(product));
    console.log("productToEdit:", $scope.productToEdit);
  };//end $scope.storeInfo

  $scope.editProduct = function() {
    console.log("editing:", $scope.productToEdit);
    var obj = $scope.productToEdit;
    $http({
      method: "PUT",
      url: "/product",
      data: obj
    }).then(function(res) {
      console.log(res);
      $scope.success = true;
      $scope.modalBody = 'Product updated.';
      ngDialog.open({
          template: 'responseModal',
          scope: $scope
      });
      $scope.getProducts();
    }); //end PUT
  }; //end $scope.editProduct

  $scope.deleteProduct = function() {
    var delObj = $scope.productToEdit.id;
    console.log("deleting:", delObj);
    $http({
      method: "DELETE",
      url: "/product/" + delObj,
      data: delObj
    }).then(function(res) {
      console.log(res);
      $scope.success = true;
      $scope.modalBody = 'Product Deleted.';
      ngDialog.open({
          template: 'responseModal',
          scope: $scope
      });
      $scope.getProducts();
    }); //end DELETE
  }; //end $scope.deleteProduct
  $scope.getProducts();

  $scope.newProduct = function() {
    var nObj = {
      type: $scope.newName,
      variety: $scope.newVariety,
      price: $scope.newPrice
    };//end nObj
    $http({
      method: "POST",
      url: "/product",
      data: nObj
    }).then (function successCallback(response)  {
      console.log("Post call response", response);
      $scope.success = true;
      $scope.modalBody = 'Product successfully added.';
      ngDialog.open({
          template: 'responseModal',
          scope: $scope
      });
      $scope.newName = "";
      $scope.newVariety = "";
      $scope.newPrice = "";
      $scope.getProducts();
    });//end POST
  };//end $scope.newProduct

  $scope.clearCreate=function(){
    $scope.newName = '';
    $scope.newVariety = '';
    $scope.newPrice = '';
  };//end $scope.clearCreate
}]);
