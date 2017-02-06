angular.module('userCards')
  .controller('userCardCtrl', function ($scope, userCardService) {
    $scope.userCardService = userCardService;
    userCardService.getData()
  });

