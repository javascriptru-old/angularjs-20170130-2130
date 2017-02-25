angular.module('routeApp')
    .service('authService', authService);

function authService() {
    let _authUser = false;

    this.getAuth = function () {
        return _authUser;
    };

    this.setAuth = function (auth) {
        _authUser = auth;
    };
}