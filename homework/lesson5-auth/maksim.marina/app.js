'use strict';
let app = angular.module('usersApp', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider
    .state({
        name: 'home',
        url: '',
        template: '<home></home>',
    })
    .state({
        name: 'login',
        url: '/login',
        template: '<login></login>',
    })
    .state({
        name: 'user',
        abstract: true,
        template: '<ui-view/>',
        url: '/user',
        resolve: {
            usersData: function (UserService) {
                return UserService.getUsers();
            }
        },
        controller: function($scope, $stateParams, usersData) {
            $scope.usersData = usersData;
        }
    })
    .state({
        name: 'user.list',
        url: '/list',
        template: '<users user-data="usersData"></users>'
    })
    .state({
        name: 'user.detail',
        url: '/:userId',
        template: '<user user-data="usersData"></user>',
    })
    .state({
        name: 'error',
        url: '/404',
        template: 'Error 404',
    });

    $urlRouterProvider.otherwise('/404');
});

app.component('home', {
    template: 'homeComponent',
    controller: function() {}
});

app.component('login', {
    templateUrl: 'template/login.tmp.html',
    controller: function() {}
});

app.component('users', {
    bindings: {
      userData: '<'
    },
    templateUrl: 'template/users.tmp.html',
    controller: function (UserService, $state) {

        this.$onInit = function() {
            this.users = this.userData;
        }

        this.selectUser = (user) => {
            let userId = this.users.indexOf(user);
            $state.go('user.detail', {'userId':userId});
        }
    }
});

app.component('user', {
    bindings: {
      userData: '<'
    },
    templateUrl: 'template/user.tmp.html',
    controller: function (UserService, $state) {
        this.$onInit = function() {
            this.user = this.userData[$state.params.userId];
        }
    },
});

app.service('UserService', function ($http) {
    this.getUsers = () => {
        let url = `https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r`;
        return $http.get(url)
            .then((response) => response.data, () => console.log('Ошибка загрузки данных'));
    }
})
