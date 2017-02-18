// jshint asi: true
;(function () {
  'use strict'

  angular.module('userList', ['ngAnimate', 'toastr', 'ui.bootstrap', 'ui.router'])
  let app = angular.module('userList')

  app.config(($stateProvider, $urlRouterProvider, toastrConfig) => {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-center',
      timeOut: 3500
    })
    $stateProvider
      .state('user', {
        abstract: true,
        name: 'user',
        url: ''
      })
      .state('user.list', {
        name: 'userList',
        url: '/user',
        component: 'userList',
        resolve: {
          users: (userService) => userService.getUsers()
        }
      })
      .state('user.card', {
        name: 'userCard',
        url: '/user/{id}',
        component: 'userCard'
      })
      .state('login', {
        name: 'login',
        url: '/login',
        component: 'appLogin'
      })
    $urlRouterProvider
      .when('/','/user')
      .otherwise('/user')
  })

  app.run()

  app.component('appRoot', {
    template: `
      <div class="container">
        <app-nav></app-nav>
        <ui-view></ui-view>
      </div>
    `
  })

  app.component('appNav', {
    templateUrl: 'app-nav.html',
    controller () {
    }
  })

  app.component('appLogin', {
    templateUrl: 'app-login.html',
    controller () {
    }
  })

  app.component('userList', {
    templateUrl: 'user-list.html',
    bindings: {
      users: '<'
    },
    controller () {
    }
  })

  app.component('userCard', {
    templateUrl: 'user-card.html',
    bindings: {
      // users: '<'
    },
    controller () {
    }
  })

  app.service('userService', function ($http, toastr) {
    const url = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r'

    this.getUsers = () => $http.get(url)
                               .then((res) => res.data,
                                     (err) => { toastr.info(err.data) })
  })
})()
