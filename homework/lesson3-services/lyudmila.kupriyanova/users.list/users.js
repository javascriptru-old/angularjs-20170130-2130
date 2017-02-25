  var app = angular.module('list', []);
  var users = {};

  app.service('UsersList', function($http) {
    this.list = () => $http.get('https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r');
  });

  app.component('cards', {
    templateUrl: 'cards.html',
    controller: ['UsersList', function(UsersList) {
      UsersList.list().then((res) => {
            this.users = res.data;
      });
      this.users = users;
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
  })
  app.component('userCard', {
    templateUrl: 'user-card.html',
    controller: function() {
      this.pnlClass = 'panel-info';
      this.setNewStyle = (x) => {
        this.pnlClass = (this.pnlClass == 'panel-info'? 'panel-primary selected':'panel-info');
      }
    },
    bindings: {
      person: '<user',
      deleteItem: '&delcard'
    }
  });