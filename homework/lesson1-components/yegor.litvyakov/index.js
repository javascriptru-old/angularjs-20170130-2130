var appModule = angular.module('lesson1', []);

appModule.controller('mainCtrl', ['$http', mainCtrl]);

appModule.component('userCard', {
    templateUrl: 'userCard.tpl.html',
    controller: [userCardCtrl],
    controllerAs: 'vm',
    bindings: {
        user: '<model',
        remove: '&'
    }
});

function mainCtrl($http) {
    var vm = this;

    vm.remove = _remove;
    vm.click = _click;

    vm.users = [];

    $http({
        method: 'get',
        url: 'users.json'
    })
        .then(function (res) {
            vm.users = res.data;
        },
        function (err) {
            console.error(err.message);
        });

    function _remove(user) {
        var index = vm.users.findIndex(function (u) {
            return u === user;
        });

        if (~index) {
            vm.users.splice(index, 1);
        }
    }

    function _click(user) {
        vm.users.forEach(function (u) {
            u.active = user === u;
        });
    }
}

function userCardCtrl() {
    var vm = this;


}
