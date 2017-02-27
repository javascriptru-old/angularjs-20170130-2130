/**
 * Created by y.masyan on 20.02.2017.
 */
angular.module('app').component('loginLogoutComponent', {
  controller: function(authService, $scope){
    this.status = authService.status;
    this.logout = function () {
      authService.status.authorized = false;
      authService.status.role = false;
    }

  },

  bindings: {

    card: '<',
    callbackSwitchoff: '&switchoff',
    callbackSwitchon: '&switchon'
  },
  template: `
<a ng-if="!$ctrl.status.authorized" ui-sref="login" style="border: solid red" ui-sref-active="active">Login</a>
<a ng-if="$ctrl.status.authorized" ui-sref="login" style="border: solid red" ui-sref-active="active" ng-click="$ctrl.logout()">Logout</a>
`,
});
