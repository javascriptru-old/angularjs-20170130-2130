angular.module('routeApp')
    .component('routeApp', {
        templateUrl: 'app.component.html',
        controller: RouteAppController
    });

function RouteAppController(userService, $state) {
    this.$onInit = function () {
        this.authUser = userService;
    };

    this.auth = function (auth) {
        this.authUser.auth = auth;

        if (!auth) {
            this.authUser.user.name = '';
            this.authUser.user.email = '';
            this.authUser.user.password = '';
            $state.go('auth')
        }
    }
}