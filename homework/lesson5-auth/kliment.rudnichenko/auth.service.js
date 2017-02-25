angular.module('routeApp')
    .service('authService', authService);

function authService() {
    this.auth = false;
}