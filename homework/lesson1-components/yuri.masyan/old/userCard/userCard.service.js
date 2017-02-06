/**
 * Created by y.masyan on 06.02.2017.
 */
/**
 * Created by y.masyan on 25.10.2016.
 */
'use strict';

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
          console.log(response.data);
        });
    };
    data.selected = function (item, index) {
     console.log("SELECTED");
     console.log(item);
     console.log(index);

    };
    data.delete = function (item, index) {
      data.cards.splice(index, 1);
      console.log(index);      
    };
    return data;
  })
;
