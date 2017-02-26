// jshint asi: true
'use strict'

/**
 * @desc Список пользователей
 */
const userList = {
  templateUrl: 'user-list.html',
  bindings: {
    users: '<'
  },
  controller ($state) {
    /**
     * @desc Переходим на userCard по клику на строку таблицы
     */
    this.goUserCard = index => {
      $state.go('user.card', { id: index })
    }
  }
}

/**
 * @desc Карточка пользователя
 */
const userCard = {
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
     * @desc Удаление пользователя через сервис и переход на список пользователей
     */
    this.deleteUser = ($event, index) => {
      $event.stopPropagation()
      userService.deleteUser(index)
      $state.go('user.list', null, { reload: 'user.list' })
    }
  }
}

/**
 * @name userService
 * @desc Сервис для работы с данными пользователей
 */
function userService ($http, $q, toastr) {
  const url = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r'
  let users = null

  /**
   * @desc Получение списка всех пользователей
   * @returns {Promise}
   */
  this.getUsers = () => {
    if (users) { return $q.resolve(users) }
    return $http.get(url)
                .then(res => users = res.data,
                      err => { toastr.info(err.data) })
  }

  /**
   * @desc Получение данных пользователя. Если нет в кэше, делаем запрос и сохраняем
   * @param {Number} index - индекс пользователя в массиве
   * @returns {Promise}
   */
  this.getUser = id => {
    if (users) { return $q.resolve(users[id]) }
    return $http.get(url)
                .then(res => {
                  users = res.data
                  return users[id]
                }, err => { toastr.info(err.data) })
  }

  /**
   * @desc Удаление пользователя из локального массива
   * @param {Number} index - индекс пользователя в массиве
   */
  this.deleteUser = id => {
    const deleted = users.splice(id, 1)
    toastr.error(`Пользователь ${deleted[0].firstName} удален`)
  }
}

/**
 * @name countryService
 * @desc Возвращает коллекцию стран
 * @returns {Object}
 */
function countryService () {
  // TODO: make service
  const countries = {
    ca: 'Канада',
    ru: 'Российская Федерация',
    ua: 'Украина'
  }

  return countries
}

/**
 * @name backgroundService
 * @desc Возвращает случайный фон для карточек пользователя
 */
function backgroundService () {
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
}

angular
  .module('userList')
  .component('userList', userList)
  .component('userCard', userCard)
  .service('userService', userService)
  .factory('countryService', countryService)
  .service('backgroundService', backgroundService)
