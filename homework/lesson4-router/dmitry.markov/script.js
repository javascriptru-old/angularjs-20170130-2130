// jshint asi: true
;(function () {
  'use strict'

  angular.module('userList', ['ngAnimate',
                              'toastr',
                              'ui.bootstrap',
                              'ui.router'])
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
        component: 'userCard',
        resolve: {
          user: (userService, $transition$) => userService.getUser($transition$.params().id),
          index: ($transition$) => $transition$.params().id
        }
      })
      .state('login', {
        name: 'login',
        url: '/login',
        component: 'appLogin'
      })
    $urlRouterProvider
      .when('/', '/user')
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
    controller ($state) {
      this.goUserCard = (index) => {
        $state.go('user.card', { id: index })
      }
    }
  })

  app.component('userCard', {
    templateUrl: 'user-card.html',
    bindings: {
      user: '<',
      index: '<'
    },
    controller ($state, backgroundService, countryService, userService) {
      this.$onInit = () => {
        this.fullName = this.user.firstName + ' ' + this.user.surname
        // get country name by code
        this.country = countryService[this.user.country]
        // set default avatar if no avatar
        this.avatar = this.user.photo ? this.user.photo : 'https://top.kz/assets/empty-avatar-c8775f1f4a1c5f0be17dfe4ae0de5fad.png'
        // set random background on card
        this.background = { 'background-image': 'url(' + backgroundService.getRandom() + ')' }
      }

      this.deleteUser = ($event, index) => {
        $event.stopPropagation()
        userService.deleteUser(index)
        $state.go('user.list', null, { reload: 'user.list' })
      }
    }
  })

  app.service('userService', function ($http, $q, toastr) {
    const url = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r'
    let users = null

    this.getUsers = () => {
      if (users) { return $q.resolve(users) }
      return $http.get(url)
                  .then((res) => users = res.data,
                        (err) => { toastr.info(err.data) })
    }
    this.getUser = (id) => {
      if (users) { return $q.resolve(users[id]) }
      return $http.get(url)
                  .then((res) => {
                    users = res.data
                    return users[id]
                  }, (err) => { toastr.info(err.data) })
    }
    this.deleteUser = (id) => {
      const deleted = users.splice(id, 1)
      toastr.error(`Пользователь ${deleted[0].firstName} удален`)
    }
  })

  /**
   * @name countryService
   * @desc Возвращает коллекцию стран
   * @returns {Object}
   */
  app.factory('countryService', function () {
    const countries = {
      ca: 'Канада',
      ru: 'Российская Федерация',
      ua: 'Украина'
    }

    return countries
  })

  /**
   * @name backgroundService
   * @desc Возвращает случайный фон для карточек пользователя
   */
  app.service('backgroundService', function () {
    const backgrounds = ['//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-1.jpg',
                         '//mark.addmin.ru/images/background-1716350_960_720.jpg',
                         '//mark.addmin.ru/images/background-1774911_960_720.jpg',
                         '//mark.addmin.ru/images/background-1695799_960_720.jpg',
                         '//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-2.jpg',
                         '//mark.addmin.ru/images/background-1709785_960_720.jpg']

    this.getRandom = () => backgrounds[Math.round(Math.random() * (backgrounds.length - 1))]
  })

})()
