/**
 * Created by y.masyan on 08.02.2017.
 */
'use strick'

angular.module('app', [])
.filter('DaysAgo', function() {
    return function (date, ...args) {
        console.log(date);
        date = date.getTime()
        let time = new Date();
        time = time.getTime();
        let days = Math.round((time-date)/3600/24);
        return `прошло ${days} дней`;
    }
})

.component('inboxComponent', {
  templateUrl: 'app/inbox.html',
  controller: function() {
    this.myUser = {
      name: 'Bob',
      age: 23
    };
    this.currentTime = new Date()
    let cardsJSON = [{"firstName":"Катерина","surname":"Латухина","photo":"http://i.imgur.com/vN6pxep.jpg","country":"ru"},{"firstName":"Максим","surname":"Иванов","photo":"http://i.imgur.com/duePtdB.jpg","country":"ru"},{"firstName":"Егор","surname":"Литвяков","photo":"http://i.imgur.com/Re2rrye.jpg","country":"ru"},{"firstName":"Елена","surname":"Ярмушева","photo":"http://i.imgur.com/7ioi0My.jpg","country":"ua"},{"firstName":"Aibulat","surname":"Nigmatullin","country":"ru"},{"firstName":"Максим","surname":"Марина","photo":"http://i.imgur.com/JSEvJwf.jpg","country":"ru"},{"firstName":"Федор","surname":"Дыдыкин","photo":"http://i.imgur.com/VjqYamq.jpg","country":"ru"},{"firstName":"Андрей","surname":"Мягченков","country":"ru"},{"firstName":"Николай","surname":"Байбородин","photo":"http://i.imgur.com/vvzLtVG.jpg","country":"ru"},{"firstName":"Дмитрий","surname":"Марков","photo":"http://i.imgur.com/MOHWnlL.png","country":"ru"},{"firstName":"Юрий","surname":"Масьян","country":"ru"},{"firstName":"Тимур","surname":"Турчанинов","country":"ru"},{"firstName":"Треско","surname":"Константин","country":"ru"},{"firstName":"Вася","surname":"Пупкин","country":"ru"},{"firstName":"Андрей","surname":"Сызранов","photo":"http://i.imgur.com/IWSqtSO.jpg","country":"ru"},{"firstName":"Климент","surname":"Рудниченко","country":"ru"},{"firstName":"Larissa","surname":"Smirnova","country":"ca"},{"firstName":"Valery","surname":"Gavrilov","country":"ru"},{"firstName":"Людмила","surname":"Куприянова","country":"ru"},{"firstName":"Данила","surname":"Бурдин","country":"ru"},{"firstName":"Александр","surname":"Джанашвили","photo":"http://i.imgur.com/pGlRYJH.jpg","country":"ru"}];
      for (var i = 0; i < cardsJSON.length; i++) {
          cardsJSON[i].messageReceived = new Date(3600 * 24 *365*47*1000*Math.random());
      }
    this.cards = cardsJSON;

      this.deleteItem = (index) => {
          this.cards.splice(index, 1)

      };
    this.name = 'John';
    this.isShown = true;

    this.checkMe = (show) => {
      this.isShown = show
    };

  }
})

.component('messageComponent', {
  templateUrl: 'app/message.html',
  controller: function() {
    //this.profile;
    //this.callbackSwitchoff

    this.dosomething = () => {
      //this.callbackSwitchoff({})
      //this.callbackSwitchon();
    }
  },
  bindings: {
    // < - one way  !!! 1.5
    // = - two way
    // @ - value
    // & - callback
    card: '<card',
    time: '<time',
    callbackDelete: '&delete',
  }
})

/*

 data.getData = function () {
 $http({
 method: 'GET',
 url: 'users.json'
 })
 .then(function (response) {
 data.cards = response.data;
 console.log(response.data);
 });
 };

 data.delete = function (item, index) {
 data.cards.splice(index, 1);
 console.log(index);
 };*/
