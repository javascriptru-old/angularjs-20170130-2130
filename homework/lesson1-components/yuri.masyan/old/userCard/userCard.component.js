
angular.module('userCards')
  .directive('userCard', function () {
    return {
      restrict: 'E',
      templateUrl: 'userCard/userCard.html',
      controller: 'userCardCtrl',
      scope: true
    }
  });
