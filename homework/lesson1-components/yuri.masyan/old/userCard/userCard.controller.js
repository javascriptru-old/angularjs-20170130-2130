/**
 * Created by y.masyan on 06.02.2017.
 */
angular.module('userCards')

  .controller('userCardCtrl', function ($scope, userCardService) {
    $scope.userCardService = userCardService;
    userCardService.getData()
  });

