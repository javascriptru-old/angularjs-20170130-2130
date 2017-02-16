angular.module('app', [])
    .service('currencyListSrv', ['$http', function($http) {
        let url = 'http://api.fixer.io/latest';
        $http.get(url).then((res) => {
            let data = res.data;
            data.rates[data.base] = 1;
            angular.extend(this, data);
        });
    }])
    .service('converterSrv', function() {
        this.convert = (from, to, qty) => (to / from * qty);
    })
    .component('converter', {
        templateUrl: 'tpls/converter.html',
        controller: ['currencyListSrv', 'converterSrv', function(listSrv, converter) {
            angular.extend(this, {
                listSrv,
                converter,
                from: 1,
                to: 1,
                qty: 1
            })
        }],
        controllerAs: 'ctrl'
    })
    .service('userListSrv', ['$http', function($http) {
        let url = 'https://learn.javascript.ru/courses/groups/api/participants';
        $http.get(url, { params: { key : '1gvlw0r' } }).then((res) => {
            let data = res.data;
            angular.extend(this, data);
        });
    }])
    .component('users', {
        templateUrl: 'tpls/users.html',
        controller: ['userListSrv', function(users) {
            angular.extend(this, { users });
        }],
        controllerAs: 'ctrl'
    })
    .component('myDirectives', {
        templateUrl: 'tpls/my-directives.html',
        controller: function() {
            this.toggler = false;
            this.click = (value) => {alert(value)}
        },
        controllerAs: 'ctrl'
    })
    .directive('myHide', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.myHide, function(value) {
                    if(value) {
                        element[0].classList.add('ng-hide');
                    } else {
                        element[0].classList.remove('ng-hide');
                    }
                });
            }
        }
    })
    .directive('myShow', function() {
        return {
            link: function(scope, element, attrs) {
                scope.$watch(attrs.myShow, function(value) {
                    if(value) {
                        element[0].classList.remove('ng-hide');
                    } else {
                        element[0].classList.add('ng-hide');
                    }
                });
            }
        }
    });