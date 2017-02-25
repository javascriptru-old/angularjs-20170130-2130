angular.module('auth')
    .component('auth', {
        templateUrl: 'auth/auth.component.html',
        controller: AuthCtrl
    });

function AuthCtrl(authService, $state) {
    this.$onInit = function () {
        this.authUser = authService.getAuth();

        this.regexp = {
            emial: /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/
        }
    };

    this.auth = function (auth) {
        authService.setAuth(auth);
        this.authUser = authService.getAuth();

        if (auth) {
            $state.go('app')
        }
    }
}