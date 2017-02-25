angular.module('routeApp', [
    'ui.router',
    'currency',
    'usersApp',
    'auth',
])
    .config(myConfig)
    .config(($httpProvider) => {
        $httpProvider.interceptors.push('AuthInterceptor');
    });

function myConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/auth');

    $stateProvider
        .state('app', {
            name: 'app',
            url: '/app',
            template: '<route-app></route-app>'
        })
        .state('auth', {
            name: 'auth',
            url: '/auth',
            template: '<auth></auth>'
        })
        .state('users', {
            parent: 'app',
            name: 'users',
            url: '/users',
            template: '<users-list></users-list>'
        })
        .state('currency', {
            parent: 'app',
            name: 'currency',
            url: '/currency',
            template: '<currency></currency>'
        });
}

angular.module('routeApp')
    .service('userService', authService);

function authService() {
    let _authUser = true;

    this.getAuth = function () {
        return _authUser;
    };

    this.setAuth = function (auth) {
        _authUser = auth;
    };
}

angular.module('routeApp')
    .service('AuthInterceptor', LoginInterceptorService);


function LoginInterceptorService($location, userService) {

    this.response = (response) => {
        if (!userService.getAuth()) {
            $location.path('/auth');
        }
        return response;
    };
}
