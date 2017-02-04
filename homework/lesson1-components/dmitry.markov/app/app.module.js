;(function () {
  'use strict'

  angular.module('userList', [])
  let app = angular.module('userList')

  app.component('appRoot', {
    template: `<div class="container">
                 <user-list></user-list>
               </div>`,
    controller: function() {
    }
  })

  app.component('userList', {
    template: `<div class="row row-padded row-centered">
                 <user-card ng-repeat="user in $ctrl.users" user="user"></user-card>
               </div>`,
    controller: function() {
      this.users = [{
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
      }]
      this.backgrounds = ['//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-1.jpg?1331440162089783574',
                         '//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-3.jpg?1331440162089783574',
                         '//cdn.shopify.com/s/files/1/0691/5403/t/130/assets/insta-2.jpg?1331440162089783574']
    }
  })

  app.component('userCard', {
    templateUrl: 'app/user-card/user-card.html',
    controller: function() {
      //this.callbackSwitchoff
      this.deleteUser = (surname) => {
        console.log(`deleted ${surname}`)
          //this.callbackSwitchoff({})
          //this.callbackSwitchon();
      }
    },
    bindings: {
     // < - one way  !!! 1.5
     // = - two way
     // @ - value
     // & - callback
     user: '<user',
     callbackSwitchoff: '&switchoff',
     callbackSwitchon: '&switchon'
    }
  })

})()
