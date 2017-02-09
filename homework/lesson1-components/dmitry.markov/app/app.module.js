// jshint asi: true
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
                            delete="$ctrl.deleteUserCard(index)"
                            active="$ctrl.removeActiveClass(index)"></user-card>
               </div>`,
    controller: function ($rootScope, userService) {
      userService.getUsers()
        .then((response) => {
        this.users = response
      })

      this.deleteUserCard = (index) => {
        this.users.splice(index, 1)
      }

      this.removeActiveClass = (index) => {
        // set to turn off all other active cards (how to do it without rootScope?)
        $rootScope.activeCard = index
      }
    }
  })

  app.component('userCard', {
    templateUrl: 'app/user-card/user-card.html',
    controller: function ($rootScope, countryService, backgroundService) {
      this.$onInit = () => {
        this.fullName = this.user.firstName + ' ' + this.user.surname
        // get country name by code
        this.country = countryService[this.user.country]
        // set default avatar if no avatar
        this.avatar = this.user.photo ? this.user.photo : 'https://top.kz/assets/empty-avatar-c8775f1f4a1c5f0be17dfe4ae0de5fad.png'
      }

      this.active = 'panel-default'
      $rootScope.$watch('activeCard', (activeIndex) => {
        // clear selection
        if (activeIndex !== this.index) this.active = 'panel-default'
      })

      this.setActive = (index) => {
        this.active = (this.active === 'panel-default') ? 'panel-primary' : 'panel-default'
        this.callbackActive({index})
      }

      this.deleteUser = ($event, index) => {
        $event.stopPropagation()
        this.callbackDelete({index})
      }

      // set random background on card
      const backgrounds = backgroundService
      const randomPhoto = backgrounds[Math.round(Math.random() * (backgrounds.length - 1))]
      this.background = { 'background-image': 'url(' + randomPhoto + ')' }
    },
    bindings: {
     user: '<',
     index: '<',
     activeIndex: '<',
     callbackDelete: '&delete',
     callbackActive: '&active'
    }
  })

  app.service('userService', function ($q, $http, $window) {
    const url = 'app/data/users.json'

    this.getUsers = () => {
      return $q((resolve, reject) => {
        $http.get(url)
          .then((response) => {
          const users = response.data
          resolve(users)
        }, (error) => {
          $window.console.log(error)
          reject(error)
        })
      })
    }
  })

  app.factory('backgroundService', function () {
    const backgrounds = ['//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-1.jpg',
                         '//mark.addmin.ru/images/background-1716350_960_720.jpg',
                         '//mark.addmin.ru/images/background-1774911_960_720.jpg',
                         '//mark.addmin.ru/images/background-1695799_960_720.jpg',
                         '//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-2.jpg',
                         '//mark.addmin.ru/images/background-1709785_960_720.jpg']

    return backgrounds
  })

  app.factory('countryService', function () {
    const countries = {
      ca: 'Канада',
      ru: 'Российская Федерация',
      ua: 'Украина'
    }

    return countries
  })

})()
