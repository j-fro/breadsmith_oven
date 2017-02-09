myApp.factory('AuthFactory', [
    '$http',
    '$window',
    function($http, $window) {
        var State = {
            admin: false,
            token: undefined
        };
        return {
            _State: State,
            isAdmin: function() {
                return State.admin;
            },
            isCustomer: function() {
                return State.admin;
            },
            checkLoggedIn: function() {
                console.log('Checking logged in');
                return $http.get('/auth');
            },
            _setStatus: function(status) {
                State.admin = status;
            },
            // admin: false,
            setToken: function(idToken) {
                State.token = idToken;
            },
            getRole: function(idToken) {
                $http({
                    method: 'GET',
                    url: '/auth',
                    headers: {
                        id_token: State.token
                    }
                }).then(function(response) {
                    console.log('response', response);
                    if (response.data === 'admin') {
                        State.admin = true;
                        $window.location.href = '#!/admin/home';
                    } else if (response.data === 'customer') {
                        State.admin = false;
                        $window.location.href = '#!/customer/home';
                    } else {
                        State.admin = false;
                        $window.location.href = '#!/login';
                    }
                });
            }
        };
    }
]);
