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
 * @name spinnerService
 * @desc Возвращает спиннер
 * @returns {Object}
 */
function spinnerService () {
  let count = 0

  /**
   * @desc Добавляет спиннер на страницу при смене раута
   */
  function showSpinner () {
    let elem = angular.element(document.querySelector('body'))
    elem.append(`
      <div class="text-center" id="mySpinner">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
        <div class="loading-text">Загрузка</div>
      </div>
    `)
  }

  /**
   * @desc Удаляет спиннер при смене раута
   */
  function hideSpinner () {
    let elem = angular.element(document.querySelector('#mySpinner'))
    elem.detach()
  }

  return {
    transitionStart () { if (++count > 0) showSpinner() },
    transitionEnd () { if (--count <= 0) hideSpinner() }
  }
}

angular
  .module('userList')
  .component('appNav', appNav)
  .service('spinnerService', spinnerService)
