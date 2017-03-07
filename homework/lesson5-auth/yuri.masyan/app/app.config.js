/**
 * Created by y.masyan on 20.02.2017.
 */
angular.module('app').config(($stateProvider, $urlRouterProvider) => {

  // An array of state definitions
  var states = [
    {
      name: 'register',
      url: '/register',
      // component: 'userListComponent',
      template: '<register-component></register-component>', //templateUrl
      ncyBreadcrumb: {
        label: 'register',
      },
      // resolve: {
      //   cards: function(PeopleService) {
      //     return PeopleService.getAllPeople();
      //   }
      // }
    } ,
    {
      name: 'login',
      url: '/login',
      // component: 'userListComponent',
      template: '<login-component></login-component>', //templateUrl
      ncyBreadcrumb: {
        label: 'Login',
      },
      // resolve: {
      //   cards: function(PeopleService) {
      //     return PeopleService.getAllPeople();
      //   }
      // }
    },
    {
      name: 'contacts',
      url: '/contacts',
      // component: 'userListComponent',
      template: '<user-list-component cards="$resolve.cards"></user-list-component>', //templateUrl
      ncyBreadcrumb: {
        label: 'userListComponent',
        parent: 'gmail'

      },
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
      // component: 'userCardComponent',
      template: '<user-card-component card="$resolve.card"></user-card-component>', //templateUrl
      ncyBreadcrumb: {
        label: 'Card {{user.username}}',
        parent: 'contacts'
      },
      controller: function($scope, $stateParams){
        $scope.user={};
        if ($stateParams.userId) {$scope.user.username = $stateParams.userId}
        // else {
        //   $state.go('login');
        // }
      },

      resolve: {
        card: function(PeopleService, $stateParams) {
          return PeopleService.getPersonById($stateParams.userId);
        }
      },
      // template: '<user-card user-id="userId"></user-card>', //templateUrl
    },
    {
      name: 'gmail',
      url: '/gmail',
      ncyBreadcrumb: {
        label: 'Gmail'
      },

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
