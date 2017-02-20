let app = angular.module('lesson4', ['ui.router']);

//////////

app.config(function ($stateProvider) {
    let userListState = {
        name: 'users',
        url: '/users',
        templateUrl: 'usersList.tpl.html',
        controller: function ($scope, users) {
            $scope.users = users;
        },
        resolve: {
            users: function (UserService) {
                return UserService.getAll();
            }
        }
    };

    let loginState = {
        name: 'login',
        url: '/login',
        templateUrl: 'login.tpl.html',
    };

    let userState = {
        name: 'user',
        url: '/user/{userId}',
        templateUrl: 'userCard.tpl.html',
        controller: function ($scope, user) {
            $scope.user = user;
        },
        resolve: {
            user: function (UserService, $stateParams) {
                return UserService.getById($stateParams.userId);
            }
        }
    };

    $stateProvider.state(loginState);
    $stateProvider.state(userListState);
    $stateProvider.state(userState);
});

//////////

app.component('page', {
    templateUrl: 'page.tpl.html'
});

//////////

app.factory('UserService', ['$http', '$q', userService]);

function userService($http, $q) {
    const URL = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r';

    let users = null;

    return {
        getAll: _getAll,
        getById: _getById
    };

    function _getAll() {
        if (users) {
            return $q.resolve(users);
        }

        return $http.get(URL).then(res => users = res.data);
    }

    function _getById(id) {
        if (users) {
            return $q.resolve(users[id]);
        } else {
            return _getAll().then(users => users[id]);
        }
    }
}

//////////