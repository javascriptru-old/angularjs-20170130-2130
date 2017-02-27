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