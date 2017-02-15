myApp.controller('ImportController', [
    '$scope',
    '$http',
    'Upload',
    'ngDialog',
    function($scope, $http, Upload, ngDialog) {
        console.log('Import Controller');
        $scope.uploadCustomerFile = function(file, errFiles, index) {
            console.log(file);
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];

            $scope.parseUpload(file, 'customer');
        };

        $scope.uploadProductFile = function(file, errFiles, index) {
            console.log(file);
            $scope.f = file;
            $scope.errFile = errFiles && errFiles[0];

            $scope.parseUpload(file, 'product');
        };

        $scope.parseUpload = function(file, route) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function(results) {
                    console.log(results);
                    $http
                        .post('/import/' + route, results.data)
                        .then(function(response) {
                            $scope.modalHeader = 'Success';
                            $scope.modalBody = 'Your file has been imported successfully';
                            ngDialog.open({
                                template: 'responseModal',
                                scope: $scope
                            });
                        })
                        .catch(function(err) {
                            console.log(err);
                            $scope.modalHeader = 'Error';
                            $scope.modalBody = 'There was an error importing your file';
                            ngDialog.open({
                                template: 'responseModal',
                                scope: $scope
                            });
                        });
                }
            });
        };
    }
]);
