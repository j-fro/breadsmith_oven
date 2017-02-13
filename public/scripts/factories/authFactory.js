myApp.factory('AuthFactory', [
    '$http',
    '$window',
    '$firebaseAuth',
    function($http, $window, $firebaseAuth) {
        var auth = $firebaseAuth();
        var State = {
            admin: false,
            token: null,
            name: null
        };
        auth.$onAuthStateChanged(function(firebaseUser) {
            if (firebaseUser) {
                console.log('user', firebaseUser);
                State.name = firebaseUser.displayName;
            }
        });
        return {
            _State: State,
            requireCustomer: function(route) {
                var user = auth.$getAuth();
                if (user) {
                    user
                        .getToken()
                        .then(function(token) {
                            $http({
                                method: 'GET',
                                url: '/auth',
                                headers: {
                                    id_token: token
                                }
                            })
                                .then(function(response) {
                                    if (response.data === 'customer') {
                                      $http({
                                        method: 'GET',
                                        url: '/auth/imSomebody',
                                        headers: {
                                            id_token: token
                                        }
                                      }).then(function(response){
                                        State.customerId = response.data.customerId;
                                        return route;
                                      });

                                    } else {
                                        return '/login';
                                    }
                                })
                                .catch(function() {
                                    return '/login';
                                });
                        })
                        .catch(function() {
                            return '/login';
                        });
                } else {
                    return '/login';
                }
            },
            requireAdmin: function(route) {
                var user = auth.$getAuth();
                if (user) {
                    user
                        .getToken()
                        .then(function(token) {
                            $http({
                                method: 'GET',
                                url: '/auth',
                                headers: {
                                    id_token: token
                                }
                            })
                                .then(function(response) {
                                    if (response.data === 'admin') {
                                        return route;
                                    } else {
                                        return '/login';
                                    }
                                })
                                .catch(function() {
                                    return '/login';
                                });
                        })
                        .catch(function() {
                            return '/login';
                        });
                } else {
                    return '/login';
                }
            },
            isAdmin: function() {
                if (!State.admin) {
                    $window.location.href = '/';
                }
            },
            isCustomer: function() {
                return State.admin;
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
                })
                    .then(function(response) {
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
                    })
                    .catch(function() {
                        State.admin = false;
                        $window.location.href = '#!/login';
                    });
            },
            logOut: function() {
                console.log('Clicked on logout');
                var auth = $firebaseAuth();
                State.token = undefined;
                console.log('auth:', auth);
                auth.$signOut().then(function(thing) {
                    console.log('auth-thing:', thing);
                    $window.location.href = '/';
                });
            }
        };
    }
]);
