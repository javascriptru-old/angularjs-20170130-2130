// jshint asi: true
'use strict'

/**
 * @desc Главное меню
 */
const appNav = {
  templateUrl: 'app-nav.html',
  controller ($state, authService) {
    this.isNavCollapsed = true
    this.isAuthed = authService.isAuthorized()

    /**
     * @desc Проверяем, не залогинился ли пользователь, чтобы сменить Login на Logout
     */
    this.$doCheck = () => {
      this.isAuthed = authService.isAuthorized()
    }

    /**
     * @desc Отправляем команду выхода из системы в authService
     */
    this.logout = $event => {
      $event.stopPropagation()
      if (authService.logout()) {
        this.isAuthed = null
        $state.go('login')
      }
    }
  }
}

/**
 * @desc Страница авторизации
 */
const appLogin = {
  templateUrl: 'app-login.html',
  bindings: {
    isAuthed: '<'
  },
  controller ($state, authService) {
    this.login = null
    this.password = null
    this.loginSuccess = false

    /**
     * @desc Отправляем данные формы в сервис authService
     */
    this.doLogin = () => {
      const loginFormData = {
        login: this.login,
        password: this.password
      }
      this.loginLoading = true
      authService.login(loginFormData)
        .then(status => {
          $state.go('user.list')
          this.loginSuccess = true
          this.loginLoading = false

      }).catch(status => {
          this.loginLoading = false
      })
    }

    /**
     * @desc Отправляем команду выхода из системы в authService
     */
    this.logout = $event => {
      $event.stopPropagation()
      if (authService.logout()) this.isAuthed = null
    }
  }
}

/**
 * @name authService
 * @desc Сервис авторизации
 */
function authService ($q, $timeout, $localStorage, toastr) {
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
   * @param {Object} loginFormData - содержит логин и пароль
   * @returns {Promise} имитация запроса к backend
   */
  this.login = loginFormData => {
    let deferred = $q.defer()

    $timeout(() => {
      if (loginFormData.login === userCredentials.login &&
          loginFormData.password === userCredentials.password) {
        $localStorage.auth = auth = loginFormData
        toastr.success(`Вы успешно авторизовались`)
        deferred.resolve(200)
      } else {
        toastr.error(`Логин или пароль не подходят`)
        deferred.reject(403)
      }
    }, 1000)

    return deferred.promise
  }

  /**
   * @desc Деавторизация пользователя
   * @returns {Boolean}
   */
  this.logout = () => {
    try {
      auth = null
      delete $localStorage.auth
      toastr.success(`Вы успешло вышли из системы`)

      return true
    } catch (e) {
      toastr.error(`Неожиданный поворот`)
      return false
    }
  }
}

angular
  .module('userList')
  .component('appNav', appNav)
  .component('appLogin', appLogin)
  .service('authService', authService)
