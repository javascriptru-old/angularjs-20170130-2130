angular.module('routeApp', [
    'ui.router',
    'currency',
    'usersApp',
    'auth',
    'reg'
])
    .config(myConfig);

function myConfig($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/auth');

    $stateProvider
        .state('auth', {
            name: 'auth',
            url: '/auth',
            template: '<auth></auth>'
        })
        .state('reg', {
            name: 'reg',
            url: '/reg',
            template: '<reg></reg>'
        })
        .state('users', {
            name: 'users',
            url: '/users',
            template: '<users-list></users-list>'
        })
        .state('currency', {
            name: 'currency',
            url: '/currency',
            template: '<currency></currency>'
        });
}



