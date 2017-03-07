/**
 * Created by y.masyan on 20.02.2017.
 */

angular.module('app')
  // .factory('userListService', function ($http) {
  //   let inboxService = {cards:{}};
  //
  //   inboxService.cards.data = [];
  //   inboxService.getData = function () {
  //     $http({
  //       method: 'GET',
  //       url: 'http://test-api.javascript.ru/v1/iliakan/users'
  //     }).then(function (response) {
  //       console.log('Данные получены2!');
  //       inboxService.cards.data = response.data;
  //     });
  //   };
  //   inboxService.getData();
  //
  //   return inboxService;
  // })
/*.component('people', {
  bindings: { people: '<' },

  template: '<h3>Some people:</h3>' +
  '<ul>' +
  '  <li ng-repeat="person in $ctrl.people">' +
  '    <a ui-sref="person({ personId: person.id })">' +
  '      {{person.name}}' +
  '    </a>' +
  '  </li>' +
  '</ul>'
})*/
  .component('userListComponent', {
  controller: function() {
    // userListService
    // this.currentTime = new Date();
    // this.cards = userListService.cards;


    this.deleteItem = (index) => {
      this.cards.splice(this.cards.indexOf(index), 1)
    };
    // this.deleteItem = (index) => {
    //   this.cards.data.splice(this.cards.data.indexOf(index), 1)
    // };

    // this.cards = [{"firstName":"Катерина","surname":"Латухина","photo":"http://i.imgur.com/vN6pxep.jpg","country":"ru"},{"firstName":"Максим","surname":"Иванов","photo":"http://i.imgur.com/duePtdB.jpg","country":"ru"},{"firstName":"Егор","surname":"Литвяков","photo":"http://i.imgur.com/Re2rrye.jpg","country":"ru"},{"firstName":"Елена","surname":"Ярмушева","photo":"http://i.imgur.com/7ioi0My.jpg","country":"ua"},{"firstName":"Aibulat","surname":"Nigmatullin","country":"ru"},{"firstName":"Максим","surname":"Марина","photo":"http://i.imgur.com/JSEvJwf.jpg","country":"ru"},{"firstName":"Федор","surname":"Дыдыкин","photo":"http://i.imgur.com/VjqYamq.jpg","country":"ru"},{"firstName":"Андрей","surname":"Мягченков","country":"ru"},{"firstName":"Николай","surname":"Байбородин","photo":"http://i.imgur.com/vvzLtVG.jpg","country":"ru"},{"firstName":"Дмитрий","surname":"Марков","photo":"http://i.imgur.com/MOHWnlL.png","country":"ru"},{"firstName":"Юрий","surname":"Масьян","country":"ru"},{"firstName":"Тимур","surname":"Турчанинов","country":"ru"},{"firstName":"Треско","surname":"Константин","country":"ru"},{"firstName":"Вася","surname":"Пупкин","country":"ru"},{"firstName":"Андрей","surname":"Сызранов","photo":"http://i.imgur.com/IWSqtSO.jpg","country":"ru"},{"firstName":"Климент","surname":"Рудниченко","country":"ru"},{"firstName":"Larissa","surname":"Smirnova","country":"ca"},{"firstName":"Valery","surname":"Gavrilov","country":"ru"},{"firstName":"Людмила","surname":"Куприянова","country":"ru"},{"firstName":"Данила","surname":"Бурдин","country":"ru"},{"firstName":"Александр","surname":"Джанашвили","photo":"http://i.imgur.com/pGlRYJH.jpg","country":"ru"}];


  },
  bindings: {
    cards: '<',
  },
  template: `
9999999999999999999
<div class="container">
  <div class="row">
    <div class="col-md-12">
      <md-list ng-cloak>
        <md-list-item ng-repeat="card in $ctrl.cards" ng-click="goToPerson(person.name, $event)" class="noright">
          <!--<md-checkbox class="md-secondary" ng-model="person.selected"></md-checkbox>-->
          <!--<img ng-src="{{card.photo}}" class="md-avatar">-->
          <p>{{card.fullName}}</p>
          <p>{{card.email}}</p>
          <p>{{card._id}}</p>
          <md-icon md-font-library="material-icons" class="md-secondary" ng-click="doSecondaryAction($event)"
                   aria-label="Chat" ui-sref="user({ userId: card._id })">account_box
          </md-icon>
          <md-icon md-font-library="material-icons" ng-click="$ctrl.deleteItem(card)" aria-label="Send Email"
                   class="md-secondary md-hue-3">delete
          </md-icon>
        </md-list-item>
      </md-list>
    </div>
  </div>
</div>
`
});
