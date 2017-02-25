// jshint asi: true
;(function () {
  'use strict'

  angular.module('mailBox', ['ngAnimate', 'toastr'])
  let app = angular.module('mailBox')

  app.config((toastrConfig) => {
    angular.extend(toastrConfig, {
      positionClass: 'toast-bottom-center',
      timeOut: 2500
    })
  })

  app.component('appRoot', {
    template: `<div class="container">
                 <mail-box></mail-box>
               </div>`
  })

  app.component('mailBox', {
    templateUrl: 'mail-box.html',
    controller () {
      this.mailList = [{
        from: 'Marie-Antoanette',
        subject: 'Waiting for you in the back of the palace',
        creationDate: Date.now() - 5000
      },{
        from: 'Mark Zuckerberg',
        subject: 'I was calling you last night, but had no answer',
        creationDate: Date.now() - 1075000
      },{
        from: 'Steve Jobs',
        subject: 'I have a great idea about new product. What do you think?',
        creationDate: Date.now() - 20000000
      },{
        from: 'Jony Ive',
        subject: 'The quick brown fox jumps over the lazy dog.',
        creationDate: Date.now() - 3600000 * 25
      },{
        from: 'LinkedIn',
        subject: 'I\'d like to add you to my professional network in LinkedIn...',
        creationDate: Date.now() - 7200000 * 75
      }]

      this.search = ''

      this.deleteMessage = (index) => {
        this.mailList.splice(index, 1)
      }
    }
  })

  app.component('mailHeader', {
    templateUrl: 'mail-header.html',
    controller ($interval, toastr) {
      this.$onDestroy = () => {
        $interval.cancel(noopInterval)
        const ttl = (Date.now() - this.mail.creationDate) / 1000

        const seconds = Math.round(ttl % 60)
        const minutes = Math.round(ttl / 60 % 60)
        const hours = Math.round(ttl / 3600 % 24)
        const days = Math.round(ttl / 3600 / 24)

        console.log(`Письмо жило ${days} дней ${hours}ч ${minutes}м ${seconds}с`)
        toastr.info(`Письмо жило ${days} дней ${hours}ч ${minutes}м ${seconds}с`)
      }

      this.deleteMessage = ($event, index) => {
        $event.stopPropagation()
        this.callbackDelete({index})
      }

      let noopInterval = $interval(angular.noop, 2000)
    },
    bindings: {
     mail: '<',
     index: '<',
     callbackDelete: '&delete'
    }
  })

  app.filter('myDate', () => {
    function filter (date) {
      let formattedDate
      const now = (Date.now() - date) / 1000

      if (now / 3600 / 24 >= 1) formattedDate = Math.round(now / 3600 / 24) + ' дней назад'
      else if (now / 3600 % 24 >=1 ) formattedDate = Math.round(now / 3600 % 24) + ' часов назад'
      else if (now / 60 % 60 >=1 ) formattedDate = Math.round(now / 60 % 60) + ' минут назад'
      else if (now % 60 >=1 ) formattedDate = Math.round(now % 60) + ' секунд назад'
      else formattedDate = 'прямо сейчас'
      return formattedDate
    }
    filter.$stateful = true
    return filter
  })

  app.filter('mySearch', () => {
     return (array, search) => {
      let filtered = []
      angular.forEach(array, (element) => {
        if (element['from'].toLowerCase().includes(search.toLowerCase()) ||
            element['subject'].toLowerCase().includes(search.toLowerCase())) {
          filtered.push(element)
        }
      })
      return filtered
    }
  })
})()
