'use strict';

  var app = angular.module('myApp', []);

  app.service('CurrencyConverterSerivce',function(){      
    this.convertCurrency = function(arr, from_c, to_c){
      if (!!arr[from_c]){
         if (!!arr[from_c][to_c]){
           return arr[from_c][to_c];
         }
      }
      return 0;
    }     
  });

  app.component('currencyConverter', {
    templateUrl: 'converter.html',
    controller: function($http, CurrencyConverterSerivce) {
      this.from_c = 'USD';
      this.to_c = 'RUB';
      this.from_v = 1;   
      $http.get('converter.json').then((data) => {
         this.data = data.data;
         this.to_v = CurrencyConverterSerivce.convertCurrency(this.data, this.from_c, this.to_c) * this.from_v;
      });       

      this.convert = function(from_c, to_c, from_v){
         this.coef = CurrencyConverterSerivce.convertCurrency(this.data, from_c, to_c);
         this.to_v = this.from_v * this.coef;
      }
    }
  }
  );

  /********************************************************* */
  app.service('UserService',function($http){
     return $http.get('https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r').then((data) => {
         return data.data;         
      });  
  });

  app.component('userList', {
    templateUrl: 'userList.html',
    controller: function(UserService) {
      UserService.then((data) => {
         this.users =  data;         
      });
    }
  }  );

  // user' card
  app.component('userCard', {
    templateUrl: 'userCard.html',
    controller: function() {      
    },
    bindings: {
       user: '<user'
    }
  });