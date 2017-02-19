var app = angular.module('myApp', ['ui.router']);

app.service('UserListService', function($http){
  this.getAll = () => {
    return $http.get('users.json');
  }
  this.getUser = () => {
    
  }
});

app.service('UserService',function($http){
     return $http.get('users.json').then((data) => {
         return data.data;         
      });  
  });

app.config(($stateProvider, $urlRouterProvider) => {
  $stateProvider.state({
    name: 'home',
    url: '',
    template: '<user-list users="users"></user-list>',
    resolve: {
      users: function(UserListService){        
        return UserListService.getAll().then((data) => { 
          return data.data;    
        });
      }
    },
    controller:function($stateParams, users, $scope) {
      $scope.users = users;
    }
  });

  $stateProvider.state({
    name: 'user',
    url: '/user/:userId',
    template: '<user-card user-id="userId" user="user"></user-card>',
    resolve: {
      usersList: function(UserListService){        
        return UserListService.getAll().then((data) => { 
          return data.data;    
        });
      }
    },
    controller: function($state, $scope, $stateParams, usersList) {
 			$scope.userId = $stateParams.userId;
      $scope.user = usersList.find(function(elem) { 
        return elem["id"] == $stateParams.userId;
      });
      
 		}
  });

  $stateProvider.state({
    name: 'login',
    url: '/login',
    templateUrl: 'login.html'
  });


  $urlRouterProvider.otherwise('home');
});

app.component('userList', {
  bindings: {
    users: '<'
  },
  templateUrl:'userList.html'
});

app.component('userCard', {
    templateUrl: 'userCard.html',
    controller: function() { },
    bindings: {
       user: '<'
    }
  });