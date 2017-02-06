
angular.module('userCards')
  .directive('userCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'userCard/userCard.html',
      controller: 'userCardCtrl',
      scope: true
    }
  });

// ЗЛО:
// ng-include
// ng-controller
// directive + template (должен быть component)
// scope: false | true
