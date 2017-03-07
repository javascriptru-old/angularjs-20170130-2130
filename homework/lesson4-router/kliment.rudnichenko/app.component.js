angular.module('routeApp')
    .component('routeApp', {
        templateUrl: 'app.component.html',
        controller: RouteAppController
    });

function RouteAppController(userService, $state) {
    this.$onInit = function () {
        this.authUser = userService.getAuth();
    };

    this.auth = function (auth) {
        userService.setAuth(auth);
        this.authUser = userService.getAuth();

        if(!auth){
            $state.go('currency')
        }
    }
}