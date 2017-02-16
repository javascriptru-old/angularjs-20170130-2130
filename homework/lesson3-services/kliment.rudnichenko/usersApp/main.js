var app = angular.module('usersApp', []);

app.component('usersList', {
    templateUrl: 'usersList.component.html',
    controller: ['users', usersListController]
});

function usersListController(users) {

    var vm = this;

    vm.$onInit = function () {
        users.get()
            .then(response => {
                    this.users = response;
                },
                error => {
                    console.error(error)
                });
    }
}

app.service('users', ['$http', usersService]);

function usersService($http) {

    this.get = function () {
        let url = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r';
        return $http.get(url)
            .then(response => response = response.data,
                error => error = error);
    }
}