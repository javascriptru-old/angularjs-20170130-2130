angular.module('routeApp', [
    'ui.router',
    'currency',
    'usersApp',
    'auth',
])
    .config(myConfig);

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



