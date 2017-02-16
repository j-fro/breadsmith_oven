myApp.controller('adminCustomerController', [
    '$scope',
    '$http',
    'ngDialog',
    function($scope, $http, ngDialog) {
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

        $scope.newCustomerAddProduct = function(product) {
            $scope.productToBeAdded.push(product);
            console.log('product added');
        };

        $scope.editCustomerAddProduct = function(product) {
            $scope.customerToEdit.products.push(product);
            console.log('product added');
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
                primary_email: $scope.primaryCustomerNumber,
                primary_phone: $scope.primaryCustomerEmail,
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
                    $scope.success = true;
                    $scope.modalBody = 'Saved customer successfully.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    $scope.viewCustomer();
                },
                function errorCallback(error) {
                    console.log('error', error);
                    $scope.modalBody = 'Sorry, there was an error. Please try again.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    console.log('error', error);
                }
            );
        }; //end addNewCustomer

        $scope.editCustomer = function(customer) {
            $scope.customerToEdit = JSON.parse(JSON.stringify(customer));
            console.log('customerToEdit:', $scope.customerToEdit.products);
        };

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
                    $scope.success = true;
                    $scope.modalBody = 'Saved customer successfully.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    $scope.viewCustomer();
                },
                function errorCallback(error) {
                    $scope.success = false;
                    $scope.modalBody = 'Sorry, there was an error. Please try again.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    console.log('error', error);
                }
            );
        }; //end updateExistingCustomer

        $scope.deleteCustomer = function() {
            var delCustomer = $scope.customerToEdit.id;
            console.log('deleting:', delCustomer);
            $http({
                method: 'DELETE',
                url: '/customer/' + delCustomer
            }).then(
                function successCallback(response) {
                    console.log(response);
                    $scope.success = true;
                    $scope.modalBody = 'Saved customer successfully.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    $scope.viewCustomer();
                },
                function errorCallback(error) {
                    console.log('error', error);
                    $scope.modalBody = 'Sorry, there was an error. Please try again.';
                    ngDialog.open({
                        template: 'responseModal',
                        scope: $scope
                    });
                    console.log('error', error);
                }
            );
        };

        //this function should delete products from the customer but not the customer//
        $scope.deleteProduct = function(product) {
            console.log('product:', product);
            var index = $scope.customerToEdit.products.indexOf(product);
            $scope.customerToEdit.products.splice(index, 1);
        };
    } //end
]);
