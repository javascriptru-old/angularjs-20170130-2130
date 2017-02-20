angular.module('routeApp', [
    'ui.router',
    'currency',
    'usersApp'
])
    .config(routeConfig);

function routeConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/currency');

    $stateProvider
        .state('currency', {
            name: 'currency',
            url: '/currency',
            template: '<currency></currency>'
        })
        .state('users', {
            name: 'users',
            url: '/users',
            template: '<users-list></users-list>',
            resolve: {

                isAuth($q, userService) {

                    let result = userService.getAuth();

                    return result ?
                        $q.when(result) :
                        $q.reject('Нет доступа!');
                }
            }
        });
}

angular.module('routeApp')
    .service('userService', authService);

function authService() {
    var _authUser = false;

    this.getAuth = function () {
        return _authUser;
    }

    this.setAuth = function (auth) {
        _authUser = auth;
    }
}