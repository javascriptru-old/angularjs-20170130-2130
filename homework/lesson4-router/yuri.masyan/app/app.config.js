/**
 * Created by y.masyan on 20.02.2017.
 */
angular.module('app').config(($stateProvider, $urlRouterProvider) => {

  // An array of state definitions
  var states = [
    {
      name: 'contacts',
      url: '/contacts',
      component: 'userListComponent',
      // template: '<user-list-component></user-list-component>',
      resolve: {
        cards: function(PeopleService) {
          return PeopleService.getAllPeople();
        }
      }
    },
    {
      name: 'user',
      url: '/contacts/{userId}',
      component: 'userCardComponent',
      resolve: {
        card: function(PeopleService, $transition$) {
          return PeopleService.getPersonById($transition$.params().userId);
        }
      },

      // template: '<user-card user-id="userId"></user-card>', //templateUrl
    },
    {
      name: 'Gmail',
      url: '/Gmail',
      template: '<inbox-component></inbox-component>', //templateUrl
    }/*,

    {
      name: 'person',
      // This state takes a URL parameter called personId
      url: '/people/{personId}',
      component: 'person',
      // This state defines a 'person' resolve
      // It delegates to the PeopleService, passing the personId parameter
      resolve: {
        person: function(PeopleService, $transition$) {
          return PeopleService.getPerson($transition$.params().personId);
        }
      }
    }*/
  ]

  // Loop over the state definitions and register them
  states.forEach(function(state) {
    $stateProvider.state(state);
  });

  // $stateProvider.state();
  // $stateProvider.state();
  // $stateProvider.state()
  // $stateProvider.state();
/*
  $stateProvider.state({
    // abstract: true,
    // reloadOnSearch: false,
    // data: { title: 'Home' },
    // resolve: {
    //   user: function(UserService) {
    //     return UserService.getOne(1);
    //   }
    // },
    name: 'user',
    url: '/user/:userId',
    template: '<user user-id="userId" user="user"></user>', //templateUrl
    controller: function ($stateParams, user) {
      $scope.userId = $stateParams.userId;
      $scope.user = user;
    }
  });
*/

  // $stateProvider.state({
  //   name: 'user.profile',
  //   url: '/user',
  //   template: '<user></user>', //templateUrl
  // });



  $urlRouterProvider.otherwise('contacts');
})
