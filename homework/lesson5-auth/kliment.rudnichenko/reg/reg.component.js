angular.module('reg')
    .component('reg', {
        templateUrl: 'reg/reg.component.html',
        controller: regCtrl
    });

function regCtrl(userService, $state) {
    this.$onInit = function () {
        this.authUser = userService;

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