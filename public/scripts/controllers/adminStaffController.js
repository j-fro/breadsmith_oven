myApp.controller('adminStaffController', ['$scope', '$http', '$window', 'AuthFactory',
    function($scope, $http, $window, AuthFactory) {
        $scope.showStaff = function() {
            $http({
                method: 'GET',
                url: '/staff',
            }).then(function successCallback(response) {
                console.log(response);
                $scope.staffView = response.data;
            }).catch(function errorCallback(error) {
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
            }; //end objectToSend
            console.log("sending:", objectToSend);
            $http({
                method: "PUT",
                url: "/staff",
                data: objectToSend
            }).then(function(response) {
                console.log(response);
                $scope.editFirst = "";
                $scope.xLastName = "";
                $scope.xEmail = "";
                $scope.showStaff();
            }).catch(function(error){
              console.log(error);
            });
        }; //end $scope.editStaff
        $scope.storeStaff = function() {
            console.log('this is x', this.staff);
            $scope.id = this.staff.id;
            $scope.xFirstName = this.staff.first_name;
            $scope.xLastName = this.staff.last_name;
            $scope.xEmail = this.staff.email;
            $scope.xRole = this.staff.role;
        }; //end $scope.storeStaff

        $scope.deleteStaff = function(){
          console.log('deleting:', $scope.id);
          $http({
            method: 'DELETE',
            url: 'staff/' + $scope.id,
            data: $scope.id
          }).then(function(response){
            console.log(response);
            $scope.showStaff();
          }).catch(function(error){
            console.log(error);
          });
        };//end $scope.deleteStaff

        $scope.addStaff = function(){
          console.log('adding staff');
          var staffToSend = {
            first_name: $scope.addFirst,
            last_name: $scope.addLast,
            email: $scope.addEmail,
            role: $scope.addRole
          };//end staffToSend
          $http({
            method: 'POST',
            url: '/staff',
            data: staffToSend
          }).then(function(response){
            console.log(response);
            $scope.addFirst = '';
            $scope.addLast = '';
            $scope.addEmail = '';
            $scope.addRole = '';
            $scope.showStaff();
          }).catch(function(error){
            console.log('problem adding:', error);
          });
        };//end $scope.addStaff

        //--clear fields if user closes add modal--//
        $scope.clearAdd=function(){
          $scope.addFirst = '';
          $scope.addLast = '';
          $scope.addEmail = '';
          $scope.addRole = '';
        };//end $scope.clearAdd

}]);
