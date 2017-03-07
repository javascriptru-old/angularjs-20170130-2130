angular.module('routeApp')
    .service('userService', userService);

function userService() {
    this.auth = false;

    this.user = {
        name: '',
        email: '',
        password: ''
    }
}