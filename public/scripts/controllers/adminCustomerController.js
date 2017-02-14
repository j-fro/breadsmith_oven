myApp.controller('adminCustomerController', [
    '$scope',
    '$http',
    '$window',
    function($scope, $http, $window) {
        console.log('NG');
        console.log('in adminCustomerController');

        $scope.productToBeAdded = [];

        $scope.viewProduct = function() {
            $http({
                method: 'GET',
                url: '/product'
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.permitted_products = response.data;
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };

        $scope.addProductToCustomer = function(product) {
            $scope.productToBeAdded.push(product);
            if ($scope.customerToEdit) {
                $scope.customerToEdit.products.push(product);
            }
            console.log('product added');
            alert('product added');
        };

        $scope.searchProduct = function() {
            var searchProductBox = $scope.searchProductBox;
            $http({
                method: 'GET',
                url: '/product'
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.permitted_products = response.data;
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };

        $scope.viewCustomer = function() {
            $http({
                method: 'GET',
                url: '/customer'
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.customers = response.data;
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };

        $scope.addCustomer = function() {
            var data = {
                name: $scope.customerName,
                address: $scope.customerAddress,
                primary_contact_name: $scope.primaryContactName,
                primary_email: $scope.primaryCustomerEmail,
                primary_phone: $scope.primaryCustomerNumber,
                secondary_contact_name: $scope.secondaryContactName,
                secondary_email: $scope.secondaryCustomerEmail,
                secondary_phone: $scope.secondaryCustomerNumber,
                products: $scope.productToBeAdded
            };
            console.log('data:', data);
            $http({
                method: 'POST',
                url: '/customer',
                data: data
            }).then(
                function successCallback(response) {
                    console.log(response);
                    alert('New Customer Added');
                    $scope.viewCustomer();
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        }; //end addNewCustomer

        $scope.editCustomer = function(customer) {
            $scope.customerToEdit = JSON.parse(JSON.stringify(customer));
            console.log('customerToEdit:', $scope.customerToEdit.products);
        };

        $scope.viewCustomerBtn = function(customer) {
            $scope.customerToView = JSON.parse(JSON.stringify(customer));
        }; //end viewCustomerBtn

        $scope.updateCustomer = function() {
            var data = $scope.customerToEdit;
            console.log('data:', data);
            $http({
                method: 'PUT',
                url: '/customer',
                data: data
            }).then(
                function successCallback(response) {
                    console.log(response);
                    alert('Customer Updated');
                    $scope.viewCustomer();
                    //still not changing the page
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        }; //end updateExistingCustomer

        $scope.deleteCustomer = function(customer) {
            console.log(customer);
            $http({
                method: 'DELETE',
                url: '/customer/' + customer.id
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.viewCustomer();
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };

        //this function should delete products from the customer but not the customer//
        $scope.deleteProduct = function(product) {
            console.log('product:', product);
            var index = $scope.customerToEdit.products.indexOf(product);
            $scope.customerToEdit.products.splice(index, 1);
            $http({
                method: 'PUT',
                url: '/customer/',
                data: $scope.customerToEdit
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.viewCustomer();
                },
                function errorCallback(error) {
                    console.log('error', error);
                }
            );
        };
    } //end
]);
