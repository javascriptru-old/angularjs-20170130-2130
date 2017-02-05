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
                            active="$ctrl.deleteActiveCard(index)"></user-card>
               </div>`,
    controller: function (newUserService, backgroundService) {
      newUserService.getUsers()
        .then((response) => {
        this.users = response
      })

      this.backgrounds = backgroundService
      this.deleteUserCard = (index) => {
        this.users.splice(index, 1)
      }
      this.deleteActiveCard = (index) => {
        console.log(index)
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
      this.setActive = (index) => {
        this.active = (this.active === 'panel-default') ? 'panel-primary' : 'panel-default'
        this.callbackActive({index})
        // TODO: turn off all other active cards
      }
      this.deleteUser = ($event, index) => {
        $event.stopPropagation()
        this.callbackDelete({index})
      }
    },
    bindings: {
     user: '<',
     index: '<',
     callbackDelete: '&delete',
     callbackActive: '&active'
    }
  })

  app.service('newUserService', function ($q, $http, $window) {
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
