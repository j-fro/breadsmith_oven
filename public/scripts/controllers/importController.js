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

            Papa.parse(file, {
                header: true,
                complete: function(results) {
                    console.log(results);
                    $http
                        .post('/import/customer', results.data)
                        .then(function(response) {
                            $scope.modalHeader = 'Success';
                            $sope.modalBody = 'Your file has been imported successfully';
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
