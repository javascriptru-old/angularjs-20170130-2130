// jshint asi: true
;(function () {
  'use strict'

  angular.module('userList', ['ngAnimate',
                              'ngStorage',
                              'toastr',
                              'ui.bootstrap',
                              'ui.router'])
  let app = angular.module('userList')

  app.config(($stateProvider, $urlRouterProvider, toastrConfig) => {
    /**
     * @desc Задаем дефолтные стили для toastr
     */
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-center',
      timeOut: 3500
    })
    /**
     * @desc Роутинг приложения
     */
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
    controller (authService) {
      this.isNavCollapsed = true
      this.isAuthed = authService.isAuthorized()

      this.logout = ($event) => {
        $event.stopPropagation()
        authService.logout()
      }
    }
  })

  app.component('appLogin', {
    templateUrl: 'app-login.html',
    controller ($state, authService) {
      this.login = null
      this.password = null

      /**
       * @desc Отправляем данные формы в сервис authService
       */
      this.doLogin = () => {
        const loginFormData = {
          login: this.login,
          password: this.password
        }
        const status = authService.login(loginFormData)

        if (status === 200) {
          console.log('login success')
          $state.go('user.list')
        }
        else if (status == 403) {
          console.log('login failed')
        }
        else {
          console.log('general login failure')
        }
      }
    }
  })

  app.component('userList', {
    templateUrl: 'user-list.html',
    bindings: {
      users: '<'
    },
    controller ($state) {
      /**
       * @desc Переходим на userCard по клику на строку таблицы
       */
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
        // получаем полное имя
        this.fullName = this.user.firstName + ' ' + this.user.surname
        // получаем название страны по коду
        this.country = countryService[this.user.country]
        // задаем аватар по-умолчанию, если нет фото
        this.avatar = this.user.photo ? this.user.photo : 'https://top.kz/assets/empty-avatar-c8775f1f4a1c5f0be17dfe4ae0de5fad.png'
        // задаем рандомный беграунд
        this.background = { 'background-image': 'url(' + backgroundService.getRandom() + ')' }
      }

      /**
       * @desc Удаление пользователя через сервис и переход на список пользователй
       */
      this.deleteUser = ($event, index) => {
        $event.stopPropagation()
        userService.deleteUser(index)
        $state.go('user.list', null, { reload: 'user.list' })
      }
    }
  })

  /**
   * @name userService
   * @desc Сервис для работы с данными пользователей
   */
  app.service('userService', function ($http, $q, toastr) {
    const url = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r'
    let users = null

    /**
     * @desc Получение списка всех пользователей
     * @returns {Promise}
     */
    this.getUsers = () => {
      if (users) { return $q.resolve(users) }
      return $http.get(url)
                  .then((res) => users = res.data,
                        (err) => { toastr.info(err.data) })
    }

    /**
     * @desc Получение данных пользователя. Если нет в кэше, делаем запрос и сохраняем
     * @returns {Promise}
     */
    this.getUser = (id) => {
      if (users) { return $q.resolve(users[id]) }
      return $http.get(url)
                  .then((res) => {
                    users = res.data
                    return users[id]
                  }, (err) => { toastr.info(err.data) })
    }

    /**
     * @desc Удаление пользователя из локального массива
     */
    this.deleteUser = (id) => {
      const deleted = users.splice(id, 1)
      toastr.error(`Пользователь ${deleted[0].firstName} удален`)
    }
  })

  /**
   * @name authService
   * @desc Сервис авторизации
   */
  app.service('authService', function ($localStorage, toastr) {
    let auth = $localStorage.auth || null
    const userCredentials = {
      login: 'admin',
      password: 'admin'
    }

    /**
     * @desc Возвращает объект авторизации или null если неавторизован
     * @returns {Object|null}
     */
    this.isAuthorized = () => auth

    /**
     * @desc Пытаемся залогиниться с данными формы и сохраняем в localStorage и auth
     * @returns {Number} статус
     */
    this.login = (loginFormData) => {
      if (loginFormData.login === userCredentials.login &&
          loginFormData.password === userCredentials.password) {
        $localStorage.auth = auth = loginFormData
        toastr.success(`Вы успешно авторизовались`)
        return 200
      }
      toastr.error(`Логин или пароль не подходят`)
      return 403
    }

    /**
     * @desc Деавтоизация пользователя
     */
    this.logout = () => {
      auth = null
      delete $localStorage.auth
      toastr.success(`Вы успешло вышли из системы`)
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
    /**
     * @name getRandom
     * @kind function
     * @desc Выбирает случайный элемент из массива backgrounds
     * @returns {String}
     */
    this.getRandom = () => backgrounds[Math.round(Math.random() * (backgrounds.length - 1))]
  })

})()
