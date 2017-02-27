let app = angular.module('lesson5', ['ui.router', 'ngStorage', 'ngMessages']);

app.config(function config ($stateProvider, $urlRouterProvider) {
    let loginState = {
        name: 'login',
        url: '/login',
        component: 'login',
    };

    let pageNotFoundState = {
        name: '404',
        url: '/404',
        component: 'pageNotFound'
    };

    let mainState = {
        name: 'main',
        url: '/main',
        data: {
            authRequired: true
        },
        template: '<h1>Main state</h1>'
    };

    let usersState = {
        name: 'users',
        url: '/users',
        data: {
            authRequired: true
        },
        component: 'usersList',
        resolve: {
            users: function (UserService) {
                return UserService.getAll();
            }
        }
    };

    let addUserState = {
        name: 'addUser',
        url: '/addUser',
        data: {
            authRequired: true
        },
        component: 'addUser'
    };

    $stateProvider
        .state('main', mainState)
        .state('users', usersState)
        .state('addUser', addUserState)
        .state('login', loginState)
        .state('pageNotFound', pageNotFoundState);

    $urlRouterProvider
        .when('/', '/main')
        .otherwise('/404');
});

app.run(function run($transitions) {
    let match = {
        to: function(state) {
            return state.data != null && state.data.authRequired === true;
        }
    };

    $transitions.onStart(match, onChange);

    function onChange(transition) {
        let $state = transition.router.stateService;
        let auth = transition.injector().get('AuthService');

        if (!auth.isAuthenticated()) {
            return auth.authenticate({login: '', password: ''}).catch(function() {
                return $state.target("login");
            });
        }
    }
});

//////////

app.factory('AuthService', authService);

function authService($q, $localStorage) {
    return {
        isAuthenticated: _isAuthenticated,
        authenticate: _authenticate,
        logOut: _logOut,
        onChange: _onChange
    };

    function _isAuthenticated() {
        return $localStorage.auth;
    }

    function _authenticate(userData) {
        if (userData.login === 'user' && userData.password === 'user') {
            $localStorage.auth = true;
            return $q.resolve(true);
        } else {
            $localStorage.auth = false;
            return $q.reject(false);
        }
        return $q.reject(false);
    }

    function _logOut() {
        delete $localStorage.auth;
        return $q.resolve(true);
    }

    function _onChange(cb) {
        cb($localStorage.auth);
    }
}

//////////

app.component('login', {
    template: `<form class="form-signin">
        <h2 class="form-signin-heading">Please sign in</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="text" id="inputEmail" class="form-control" placeholder="Login" required autofocus ng-model="$ctrl.login">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required ng-model="$ctrl.password">
        <p class="alert alert-info">Use "user" login with "user" password for enter</p>
        <div class="checkbox">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" ng-click="$ctrl.logIn()">Sign in</button>
    </form>`,
    controller: loginController
});

function loginController(AuthService, $state) {
    this.login = 'user';
    this.password = 'user';

    this.logIn = _logIn;

    function _logIn() {
        AuthService.authenticate({
            login: this.login,
            password: this.password
        }).then((res) => {
            $state.go('main');
        });
    }
}

//////////

app.component('page', {
    template: `<main class="page container">
        <menu></menu>
        <div ui-view class="page__content"></div>
    </main>`
});

//////////

app.component('menu', {
    template: `<nav class="menu" ng-if="$ctrl.isKnownUser">
        <ul class="menu__list nav nav-tabs">
            <li class="menu__item"><a ui-sref="users">Users list</a></li>
            <li class="menu__item"><a href="javascript:void(0);" ng-click="$ctrl.logOut()">Logout</a></li>
        </ul>
    </nav>`,
    controller: ['AuthService', "$state", menuController]
});

function menuController(AuthService, $state) {
    this.isKnownUser = AuthService.isAuthenticated();
    this.logOut = _logOut;

    this.$doCheck = () => {
        this.isKnownUser = AuthService.isAuthenticated()
    }

    function _logOut() {
        AuthService.logOut().then((res) => {
            $state.reload();
        });
    }
}

//////////

app.factory('UserService', ['$http', '$q', '$state', userService]);

function userService($http, $q, $state) {
    //const URL = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r';
    const URL = 'http://test-api.javascript.ru/v1/ylitvyakov';

    let users = null;

    return {
        getAll: _getAll,
        getById: _getById,
        addUser: _addUser,
        deleteUser: _deleteUser
    };

    function _getAll() {
        return $http.get(URL + '/users').then(res => res.data);
    }

    function _getById(id) {
        if (users) {
            return $q.resolve(users[id]);
        } else {
            return _getAll().then(users => users[id]);
        }
    }

    function _addUser(user) {
        $http.post(URL + '/users', user).then((res) => {
            $state.go('users');
        })
    }

    function _deleteUser(id) {
        $http.delete(URL + '/users/' + id)
            .then((res) => {
                $state.reload();
            });
    }
}

//////////

app.component('usersList', {
    template: `<a ui-sref="addUser" class="btn btn-primary btn-block">
        <span class="glyphicon glyphicon-user"></span>
        Add user
    </a>
    <br>
    <ul class="list-group">
        <li class="list-group-item" ng-repeat="user in $ctrl.users track by $index">
            <a ui-sref="user({userId: user._id})" ng-bind="user.fullName"></a>
            <a href="javascript:void(0)" ng-click="$ctrl.delete(user._id)" class="glyphicon glyphicon-remove pull-right"></a>
        </li>
    </ul>`,
    bindings: {
        users: '<'
    },
    controller: usersListController
});

function usersListController(UserService) {
    this.delete = _delete;

    function _delete(id) {
        UserService.deleteUser(id);
    }
}

//////////

app.component('addUser', {
    template: `<form name="addUser" class="add-user">
        <h2 class="add-user-heading">You can add user here</h2>
        <div class="form-group" ng-class="{'has-error': !addUser.name.$valid}">
            <label class="control-label" for="inputName">Name</label>
            <input type="text" name="name" id="inputName" class="form-control" placeholder="Name" required ng-model="$ctrl.name" autofocus>
            <div ng-messages="addUser.name.$error">
                <p class="message bg-danger" ng-message="required">Name is required</p>
            </div>
        </div>
        <div class="form-group" ng-class="{'has-error': !addUser.surname.$valid}">
            <label class="control-label" for="inputSurname">Surname</label>
            <input type="text" name="surname" id="inputSurname" class="form-control" placeholder="Surname" required ng-model="$ctrl.surname">
            <div ng-messages="addUser.surname.$error">
                <p class="message bg-danger" ng-message="required">Surname is required</p>
            </div>
        </div>
        </div>
        <div class="form-group" ng-class="{'has-error': !addUser.email.$valid}">
            <label class="control-label" for="inputEmail">Email address</label>
            <input type="email" name="email" id="inputEmail" unique class="form-control" placeholder="Email address" required ng-model="$ctrl.email">
            <div ng-messages="addUser.email.$error">
                <p class="message bg-danger" ng-message="unique">Should be a unique email</p>
                <p class="message bg-danger" ng-message="email">Should be a correct email</p>
                <p class="message bg-danger" ng-message="required">Email is required</p>
            </div>
        </div>
        <button class="btn btn-primary btn-block" type="submit" ng-click="$ctrl.addUser()" ng-disabled="!addUser.$valid">Add user</button>
    </form>`,
    controller: addUserController
});

function addUserController(UserService) {
    this.addUser = _addUser;

    function _addUser() {
        UserService.addUser({
            fullName: this.name + ' ' + this.surname,
            email: this.email
        });
    }
}

//////////

app.directive('unique', function ($http, UserService) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch(attrs.ngModel, function (email) {
                UserService.getAll().then((users) => {
                    let existingUser = users.find(function (user) {
                        return user.email === email;
                    });

                    if (!existingUser) {
                        ctrl.$setValidity('unique', true);
                    } else {
                        ctrl.$setValidity('unique', false);
                    }
                })
            });
        }
    };
});

//////////

app.component('pageNotFound', {
    template: `<div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="error-template">
                    <h1>
                        Oops!</h1>
                    <h2>
                        404 Not Found</h2>
                    <div class="error-details">
                        Sorry, an error has occured, Requested page not found!
                    </div>
                    <div class="error-actions">
                        <a ui-sref="main" class="btn btn-primary btn-lg">
                            <span class="glyphicon glyphicon-home"></span>
                            Take Me Home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>`
});
