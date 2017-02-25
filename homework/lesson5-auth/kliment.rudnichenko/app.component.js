angular.module('routeApp')
    .component('routeApp', {
        templateUrl: 'app.component.html',
        controller: RouteAppController
    });

function RouteAppController(authService, $state) {
    this.$onInit = function () {
        this.authUser = authService;
    };

    this.auth = function (auth) {
        this.authUser.auth = auth;

        if(!auth){
            $state.go('auth')
        }
    }
}