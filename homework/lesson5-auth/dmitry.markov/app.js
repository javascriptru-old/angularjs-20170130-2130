// jshint asi: true
'use strict'

angular
  .element(document).ready(() => {
    angular
      .bootstrap(document, ['userList'])
    angular
      .element(document.querySelector('#mySpinner')).detach()
  })

/**
 * @desc Корневой компонент
 */
const appRoot = {
  template: `
    <div class="container">
      <app-nav></app-nav>
      <div ui-view></div>
    </div>
  `
}

/**
 * @name appConfig
 * @desc Настройки приложения во время старта
 */
function appConfig ($stateProvider, $urlRouterProvider, toastrConfig) {
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
      data: { pageTitle: 'User List' },
      component: 'userList',
      resolve: {
        users: userService => userService.getUsers()
      }
    })
    .state('user.card', {
      name: 'userCard',
      url: '/user/{id}',
      data: { pageTitle: 'User Details' },
      component: 'userCard',
      resolve: {
        user: (userService, $transition$) => userService.getUser($transition$.params().id),
        index: $transition$ => $transition$.params().id
      }
    })
    .state('user.add', {
      name: 'userAdd',
      url: '/user/add',
      data: { pageTitle: 'User Add' },
      component: 'userAdd',
      resolve: {
      }
    })
    .state('login', {
      name: 'login',
      url: '/login',
      data: { pageTitle: 'Login' },
      component: 'appLogin',
      resolve: {
        isAuthed: authService => authService.isAuthorized()
      }
    })
  $urlRouterProvider
    .when('/', '/user')
    .otherwise('/user')
}

/**
 * @name appRun
 * @desc Настройки приложения во время рантайма
 */
function appRun ($rootScope, $state, $transitions, toastr) {
  // Чтобы менять <title> страницы
  $rootScope.$state = $state

  /**
   * @desc Если пользователь не залогинен, посылаем на логин
   */
  $transitions.onStart({ to: 'user.**' }, trans => {
    let auth = trans.injector().get('authService') // inject in header
    if (!auth.isAuthorized()) {
      toastr.warning(`Пожалуйста, залогиньтесь`)
      return trans.router.stateService.target('login')
    }
  })

  /**
   * @desc Показываем спиннер, пока route грузится (и резолвится)
   */
  $transitions.onStart({ }, trans => {
    let SpinnerService = trans.injector().get('spinnerService')
    SpinnerService.transitionStart()
    trans.promise.finally(SpinnerService.transitionEnd)
  })
}

angular
  .module('userList',
         ['angular-ladda',
          'ngAnimate',
          'ngStorage',
          'toastr',
          'ui.bootstrap',
          'ui.router'])
  .config(appConfig)
  .run(appRun)
  .component('appRoot', appRoot)
