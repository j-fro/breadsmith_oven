myApp.controller('adminStaffController', ['$scope', '$http', '$window', 'AuthFactory',
    function($scope, $http, $window, AuthFactory) {
        console.log('in adminStaffController');
        $scope.showStaff = function() {
            $http({
                method: 'GET',
                url: '/staff',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.staffView = response.data;
            }, function errorCallback(error) {
                console.log('error', error);
            });
        }; //end $scope.showStaff
        $scope.showStaff();

        $scope.editStaff = function() {
            console.log("editing", this);
            var objectToSend = {
                id: this.id,
                first_name: this.editFirst,
                last_name: this.editLast,
                email: this.editEmail,
                role: this.editRole
            };
            console.log("obj is", objectToSend);
            $http({
                method: "PUT",
                url: "/staff",
                data: objectToSend
            }).then(function(response) {
                console.log(response);
                location.reload();
                $scope.showStaff();
            });
        }; //end editStaff

        $scope.storeStaff = function() {
            var x = this.staff;
            console.log('this is x', x);
            $scope.id = x.id;
            $scope.xFirstName = x.first_name;
            $scope.xLastName = x.last_name;
            $scope.xEmail = x.email;
            $scope.xRole = x.role;
        }; //end $scope.storeStaff
    }
]);
