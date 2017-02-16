/**
 * Created by y.masyan on 08.02.2017.
 */
'use strick'

angular.module('app', [])
.filter('DaysAgo', function() {
    return function (date, ...args) {
        // console.log(date);
        date = date.getTime()
        let time = new Date();
        time = time.getTime();
        let days = Math.round((time-date)/3600/24);
        return `прошло ${days} дней`;
    }
})
  .factory('inboxService', function ($http) {
    var inboxService = {};

    inboxService.data = [];
    inboxService.getData = function () {
      $http({
        method: 'GET',
        url: 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r'
      }).then(function (response) {
        alert('Данные получены!');
        inboxService.data = response.data;
        for (var i = 0; i < inboxService.data.length; i++) {
          inboxService.data[i].messageReceived = new Date(3600 * 24 *365*47*1000*Math.random());
        }
      });
    };
    inboxService.getData();

    return inboxService;
  })

.component('inboxComponent', {
  templateUrl: 'app/inbox.html',
  controller: function(inboxService) {
    this.myUser = {
      name: 'Bob',
      age: 23
    };
    this.currentTime = new Date();
    this.cards = inboxService.getdata();


    this.deleteItem = (index) => {
          this.cards.data.splice(this.cards.data.indexOf(index), 1)
    };
    this.name = 'John';
    this.isShown = true;

    this.checkMe = (show) => {
      this.isShown = show
    };

  }
})

  .factory('currencyConverterService', function ($http) {
    var data = {};
    data.currencies = [];
    let splitt = function (rates) {
      for (var key in rates.rates) {
        data.currencies.push(key)
      }
      console.log(data.currencies);
      console.log(data.rates);

    }

    data.rates = [];
    data.getData = function () {
      $http({
        method: 'GET',
        url: 'http://api.fixer.io/latest'
      }).then(function (response) {
        data.rates = response.data;
        splitt(data.rates);
      });
    };
    data.getData();



    return data;
  })

.component('currencyConverterComponent', {
  template: `
<!--<select ng-model='$ctrl.currency1' ng-options="item for item in $ctrl.curr.currencies"></select>-->
<select ng-model='$ctrl.currency2' ng-options="item for item in $ctrl.curr.currencies"></select>
{{$ctrl.currency1}}
<input ng-model="$ctrl.value">
=
{{$ctrl.value /$ctrl.curr.rates.rates[$ctrl.currency2] || ""}}
<!--{{$ctrl.curr.rates.rates}}-->
EUR
  `,
  controller: function(currencyConverterService) {
    this.curr = currencyConverterService;
  }
})

.component('messageComponent', {
  templateUrl: 'app/message.html',
  controller: function() {
  },
  bindings: {
    card: '<card',
    time: '<time',
    callbackDelete: '&delete',
  }
})
