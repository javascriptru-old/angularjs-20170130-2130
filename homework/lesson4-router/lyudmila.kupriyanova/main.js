  var app = angular.module('list', ['ui.router']);
  var users = {};

  app.service('UsersList', function($http) {
    this.list = () => $http.get('users.json',
       {
         transformResponse: function (data) {
           data = JSON.parse(data);
           for (var i = 0; i < data.length; i++){
             data[i].id = i;
           };
           return data;
         }
      }
    );
    //https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r
  });

 app.config(($stateProvider, $urlRouterProvider) => {

   $stateProvider.state({
      name: 'login',
      url: '',
      template: '<login></login>'
    }).state({
      name: 'cards',
      url: 'cards',
      resolve: {
          users: function(UsersList) {
          return UsersList.list().then((res) => {
            res.data.visible = true;
            return res.data;
          });
        }
      },
      template: '<cards users="users" visible="visible"></cards>',
      controller: function($state, $scope, $stateParams, users) {
            $scope.visible = users.visible;
            $scope.users = users;
            $scope.userId = $stateParams.userId;
      }
    }).state({
      name: 'user',
      url: '/user/:userId',
      resolve: {
          users: function(UsersList) {
          return UsersList.list().then((res) => {
            res.data.visible = true;
            return res.data;
          });
        }
      },
      template: '<user user-id="userId" user="user" visible="visible"></user>',
      controller: function($state, $scope, $stateParams, users) {
            $scope.visible = users.visible;
            $scope.userId = $stateParams.userId;
            $scope.user = users[$scope.userId];
      }
    });
  });

  app.component('login', {
    templateUrl: 'login.html',
    controller: function ($state) {
      this.go = () => {$state.go('cards');};
    }
  });

  app.component('cards', {
    bindings: {
      visible: '<',
      users: '<'
    },
    templateUrl: 'cards.html',
    controller: [function($state) {
      this.deleteItem = (item) => {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i] == item) {
            this.users.splice(i, 1);
            break;
          }
        }
      };
      this.refresh = () => {
        UsersList.list().then((res) => {
            this.users = res.data;
      });
      };
    }]
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
  app.component('user', {
    bindings: {
      user: '<',
      visible: '<'
    },
    template: `<a ui-sref="cards">Вернуться к списку</a>
        <div ng-if="$ctrl.visible" class="logo">
                <div><span>{{$ctrl.user.surname}} {{$ctrl.user.firstName}}</span></div>
                <div><img class="photo" ng-src="{{$ctrl.user.photo}}"></div>
        </div>
                <p ng-if="!($ctrl.visible)">Загрузка данных...</p>
    `,
    controller: function() {
    },
  });
