angular.module('userCards')
  .factory('userCardService', function ($http) {
    var data = {cards: {}};
    data.getData = function () {
      $http({
        method: 'GET',
        url: 'users.json'
      })
        .then(function (response) {
          data.cards = response.data;
        });
    };

    data.delete = function (item, index) {
      data.cards.splice(index, 1);
    };
    return data;
  });
