myApp.factory('AuthFactory', [
    '$http',
    '$window',
    function($http, $window) {
        var Status = {
            admin: false
        };
        return {
            _Status: Status,
            isAdmin: function() {
                return Status.admin;
            },
            isCustomer: function() {
                return Status.admin;
            },
            checkLoggedIn: function() {
                console.log('Checking logged in');
                return $http.get('/auth');
            },
            _setStatus: function(status) {
                Status.admin = status;
            },
            admin: false,
            getRole: function() {
                $http.get('/auth').then(function(response) {
                    if (response.data === 'admin') {
                        console.log(this);
                        Status.admin = true;
                        console.log('_admin', Status.admin);
                        $window.location.href = '#!/admin/home';
                    } else if (response.data === 'customer') {
                        Status.admin = false;
                        $window.location.href = '#!/customer/home';
                    } else {
                        $window.location.href = '#!/login';
                    }
                });
            }
        };
    }
]);
