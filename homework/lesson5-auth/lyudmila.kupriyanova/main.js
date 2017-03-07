'use strict'
  var app = angular.module('list', ['ui.router','ngStorage']);
  var users = {};

  app.service('AuthService', function ($localStorage, $q) {
    let creds = {l: 'admin', p: '123'};
    // если пользователь авторизован, в $localStorage.auth хранится 1
    let auth = $localStorage.auth || 0;
    this.isAuth = () => auth
    this.Authorize = (l,p) => {
      let request = $q.defer();
      //$timeout() => $q.resove()
      // setTimeout вместо запроса к БД
      setTimeout(() => {
        if (l===creds.l && p===creds.p) {auth = 1; $localStorage.auth = 1;
        request.resolve(true);}
        else request.reject(new Error("Ошибка авторизации"));
         }, 1000);
      return request.promise;
    }
  });
  app.service('AuthInterceptor', function($q, $state){
    this.responseError = (httpConfig) => {
      if (httpConfig.status === 401) {
        $state.go('login');
      }
      return $q.reject(httpConfig);
    };
  });
  app.service('UsersList', function($http, $q) {
    let users = null;
    let maxId = -1;
    this.getUsers = () => {
      if (users) {return $q.resolve(users)}
      return $http.get('users.json', {transformResponse: function(data){
          data = JSON.parse(data);
          for (var i = 0; i < data.length; i++){
            data[i].id = i; maxId = i;
          };
          return data;
        }
      }).then(res => users = res.data)
    };
    this.saveUser = (user) => {
      if (user.id && users) {
        for (let item of users)
          if (item.id == user.id) {
            item.firstName = user.firstName;
            item.surname = user.surname;
            item.username = user.username;
            item.email = user.email;
            break;
          }
      } else {
        maxId = maxId + 1;
        user.id = maxId;
        users.push(user);
      }
    };
    this.deleteUser = item => {
      users.splice(users.indexOf(item), 1);
    };
    //https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r
  });

 app.config(($stateProvider, $urlRouterProvider, $httpProvider) => {
  $httpProvider.interceptors.push('AuthInterceptor');
  $stateProvider
    .state({
      abstract: true,
      name: 'common',
      url: '',
      resolve: {
        auth: AuthService => AuthService.isAuth()
      }
    })
    .state({
      name: 'login',
      parent: 'common',
      url: '/login',
      template: '<login></login>'
    })
    .state({
      name: 'cards',
      parent: 'common',
      url: '/users',
      resolve: {
        cards: UsersList => UsersList.getUsers()
      },
      template: '<cards users="users">Идет загрузка ...</cards>',
      controller: function($scope, cards) {
            $scope.users = cards;
      }
    })
    .state({
      name: 'user',
      parent: 'common',
      url: '/users/:userId',
      resolve: {
        users: UsersList => UsersList.getUsers()
      },
      template: '<card user-id="userId" user="user">Идет загрузка ...</card>',
      controller: function($scope, $stateParams, users) {
            $scope.userId = $stateParams.userId;
            if ($scope.userId == '') $scope.user = {};
            else
            for (let user of users)
              if (user.id == $scope.userId) {
                $scope.user = user;
                break;
            }
      }
    })
    $urlRouterProvider
    .when('/', '/users')
    .otherwise('/users')
  });

  app.component('login', {
    templateUrl: 'login.html',
    controller: function ($state,AuthService) {
      this.go = () => {
        AuthService
          .Authorize(this.loginId,this.pwd)
          .then(result => $state.go('cards'), error => alert(error.message));
      }
    }
  });
  app.component('cards', {
    bindings: {
      visible: '<',
      users: '<'
    },
    templateUrl: 'cards.html',
    controller: function($state, UsersList) {
      this.deleteItem = (item) => {
        UsersList.deleteUser(item);
        $state.go('cards', null, { reload: 'cards' })
      };
    }
  });
  app.component('userCard', {
    templateUrl: 'user-card.html',
    controller: function() {
      this.rowcss = 'unread';
      this.setRead = (x) => {
        this.rowcss = '';
      }
    },
    bindings: {
      person: '<user',
      deleteItem: '&delcard'
    }
  });
  app.component('card', {
    bindings: {
      user: '<',
      visible: '<'
    },
    templateUrl: 'card.html',
    controller: function($scope, $state, UsersList) {
      this.saveItem = (item) => {
        UsersList.saveUser(item);
        $state.go('cards', null, { reload: 'cards' })
      };
      $scope.submitForm = function() {
            if ($scope.userForm.$valid) {
                UsersList.saveUser($scope.$ctrl.user);
                $state.go('cards', null, { reload: 'cards' })
            }
        };
    }
  });
  app.run(($rootScope, $state, $transitions, AuthService) => {
    $transitions.onError({ to: 'user' }, function($error$) {
      console.log($error$);
    });
    $transitions.onEnter({ to: 'user' }, function($state$, $transition$){
        console.log('START!');
    })
    $transitions.onStart({to: 'login'}, function () {
      if (AuthService.isAuth()) {
        return $state.target('users');
      }
    });
    $transitions.onStart({to: function (state) {
        return (state.name != 'login');
      }}, () => {
      if (!AuthService.isAuth()) {return $state.target('login');}
      else {return true;}
    });
  });


