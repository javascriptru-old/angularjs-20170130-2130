angular.module('routeApp')
    .component('routeApp', {
        templateUrl: 'app.component.html',
        controller: RouteAppController
    });

function RouteAppController(authService, $state) {
    this.$onInit = function () {
        this.authUser = authService.getAuth();
    };

    this.auth = function (auth) {
        authService.setAuth(auth);
        this.authUser = authService.getAuth();

        if(!auth){
            $state.go('auth')
        }
    }
}