;(function () {
  'use strict'

  angular.module('userList', [])
  let app = angular.module('userList')

  app.component('appRoot', {
    template: `<div class="container">
                 <user-list></user-list>
               </div>`
  })

  app.component('userList', {
    template: `<div class="row row-padded row-centered">
                 <user-card ng-repeat="(index, user) in $ctrl.users"
                            user="user"
                            index="index"
                            delete="$ctrl.deleteUserCard(index)"></user-card>
               </div>`,
    controller: function (usersService, backgroundService) {
      this.users = usersService
      this.backgrounds = backgroundService
      this.deleteUserCard = (index) => {
        this.users.splice(index, 1)
      }
    }
  })

  app.component('userCard', {
    templateUrl: 'app/user-card/user-card.html',
    controller: function (countryService) {
      this.$onInit = () => {
        this.fullName = this.user.firstName + ' ' + this.user.surname
        this.country = countryService[this.user.country]
      }
      this.active = 'panel-default'
      this.setActive = () => {
        this.active = (this.active === 'panel-default') ? 'panel-primary' : 'panel-default'
        // TODO: turn off all other active cards
      }
      this.deleteUser = ($event, index) => {
        $event.stopPropagation()
        this.callbackDelete({index})
      }
    },
    bindings: {
     user: '<user',
     index: '<index',
     callbackDelete: '&delete'
    }
  })

  app.factory('usersService', function () {
    const users = [{
        "firstName": "Николай",
        "surname": "Байбородин",
        "photo": "http://i.imgur.com/vvzLtVG.jpg",
        "country": "ru"
      }, {
        "firstName": "Дмитрий",
        "surname": "Марков",
        "photo": "http://i.imgur.com/MOHWnlL.png",
        "country": "ru"
      }, {
        "firstName": "Юрий",
        "surname": "Масьян",
        "country": "ru"
      }, {
        "firstName": "Катерина",
        "surname": "Латухина",
        "photo": "http://i.imgur.com/vN6pxep.jpg",
        "country": "ru"
      }, {
        "firstName": "Максим",
        "surname": "Иванов",
        "photo": "http://i.imgur.com/duePtdB.jpg",
        "country": "ru"
      }, {
        "firstName": "Егор",
        "surname": "Литвяков",
        "photo": "http://i.imgur.com/Re2rrye.jpg",
        "country": "ru"
      }]

    return users
  })

  app.factory('backgroundService', function () {
    const backgrounds = ['//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-1.jpg?1331440162089783574',
                         '//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-3.jpg?1331440162089783574',
                         '//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-2.jpg?1331440162089783574']

    return backgrounds
  })

  app.factory('countryService', function () {
    const countries = {
      ca: 'Канада',
      ru: 'Российская федерация',
      ua: 'Украина'
    }

    return countries
  })

})()
