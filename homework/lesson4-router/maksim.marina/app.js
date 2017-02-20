'use strict';
let app = angular.module('usersApp', ['ui.router']);

app.config(($stateProvider, $urlRouterProvider) => {
    $stateProvider.state({
        name: 'home',
        url: '',
        template: '<home></home>',
    });

    $stateProvider.state({
        name: 'login',
        url: '/login',
        template: '<login></login>',
    });

    $stateProvider.state({
        name: 'user',
        abstract: true,
        template: '<ui-view/>',
        url: '/user',
        resolve: {
            usersData: function (UserService) {
                //Нужно получить список пользователей при помощи сервиса UserService, метод UserService.getUsers()
            }
        },
        controller: function($scope, $stateParams, usersData) {
            //$scope.usersData = usersData;
        }
    });

    $stateProvider.state({
        name: 'user.list',
        url: '/list',
        template: '<users></users>',
    });

    $stateProvider.state({
        name: 'user.detail',
        url: '/:userId',
        template: '<user></user>',
    });

    $stateProvider.state({
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
    templateUrl: 'template/users.tmp.html',
    controller: function (UserService, $state) {
        this.users = [];
        UserService.getUsers().then( (data)  => {
            this.users = data;
        });

        this.selectUser = (user) => {
            let userId = this.users.indexOf(user);
            $state.go('user.detail', {'userId':userId});
        }
    }
});

app.component('user', {
    templateUrl: 'template/user.tmp.html',
    controller: function (UserService, $state) {
        //Делаем выборку данных по пользователю с указанным ID
        console.log("Делаем выборку данных по пользователю с ID: " + $state.params.userId);
    },
});

app.service('UserService', function ($http) {
    this.getUsers = () => {
        let url = `https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r`;
        return $http.get(url)
            .then((response) => response.data, () => console.log('Ошибка загрузки данных'));
    }
})
