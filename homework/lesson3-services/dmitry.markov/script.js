// jshint asi: true
;(function () {
  'use strict'

  angular.module('currencyWidget', ['ngAnimate', 'toastr'])
  let app = angular.module('currencyWidget')

  app.config((toastrConfig) => {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-center',
      timeOut: 3500
    })
  })

  app.component('appRoot', {
    template: `
      <div class="container">
        <currency-widget></currency-widget>
      </div>
    `
  })

  app.component('currencyWidget', {
    templateUrl: 'currency-widget.html',
    controller (currencyService) {
      currencyService.getRates()
        .then((response) => {
          this.data = response
          this.data.rates['EUR'] = 1
      })
      currencyService.getNames()
        .then((response) => {
          this.names = response
      })
      this.from = 1
      this.to = 1
      this.result = 0
    }
  })

  app.factory('currencyService', function ($http, toastr) {

    let ratesUrl = 'http://api.fixer.io/latest'
    let namesUrl = 'names.json'
    // let namesUrl = 'https://gist.githubusercontent.com/Fluidbyte/2973986/raw/b0d1722b04b0a737aade2ce6e055263625a0b435/Common-Currency.json'

    function getRates () {
      return $http.get(ratesUrl)
          .then((response) => {
            return response.data
          }, (error) => {
            toastr.info(error)
          })
    }

    function getNames () {
      return $http.get(namesUrl)
          .then((response) => {
            return response.data
          }, (error) => {
            toastr.info(error)
          })
    }

    let service = {
      getRates,
      getNames
    }

    return service
  })
})()
