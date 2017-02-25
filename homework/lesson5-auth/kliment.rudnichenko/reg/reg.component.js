angular.module('reg')
    .component('reg', {
        templateUrl: 'reg/reg.component.html',
        controller: regCtrl
    });

function regCtrl(authService, $state) {
    this.$onInit = function () {
        this.authUser = authService;

        this.regexp = {
            emial: /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/
        }
    };

    this.auth = function (auth) {
        this.authUser.auth = auth;

        if (auth) {
            $state.go('currency')
        }
    }

    this.reg = function () {
        this.authUser.auth = true;
    }
}