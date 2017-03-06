const app = angular.module('myApp', []);

app.service('Calc', function() {
  this.sum = (a, b) => a + b;
});

app.controller('MainController', function(Calc) {
  this.doCalculations = (a, b) => {
    this.result = Calc.sum(a, b);
  }
});

app.service('UserService', function($http) {
  this.getOne = (id) => $http.get('/users/' + id)
    .then(response => response.data);

  this.getAll = () => $http.get('/users')
    .then(response => response.data);
});

app.directive('userCard', function(UserService) {
  return {
    scope: {
      user: '<'
    },
    template: '<div>{{user.name}}</div>',
    link: function($scope) {
      $scope.someMethod = () => {
        return UserService.getOne(1).then( user => $scope.user = user);
      };
    }
  };
});

app.component('userProfile', {
  bindings: {
    user: '<'
  },
  template: '<div>{{$ctrl.user.name}}</div>',
  controller: function(UserService) {
    this.someMethod = () => {
      UserService.getOne(1).then( user => this.user = user);
    };
  }

});