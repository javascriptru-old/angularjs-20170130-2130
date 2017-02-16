let app = angular.module('lesson3', []);

//////////

app.component('page', {
    templateUrl: 'page.tpl.html',
    controller: ['UserService', pageController]
});

function pageController(UserService) {
    this.users = [];

    UserService.getAll()
        .then((users) => {
            this.users = users;
        }, (err) => {
            console.error(err);
        });
}

//////////

app.factory('UserService', ['$http', '$q', userService]);

function userService($http, $q) {
    const URL = 'https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r';

    let users = null;

    return {
        getAll: _getAll
    };

    function _getAll() {
        if (users) {
            return $q.resolve(users);
        }

        return $http.get(URL)


        .then(res => res.data);
    }
}

//////////

app.factory('CurrencyConverterSerivce', ['$http', '$q', currencyConverterSerivce]);

function currencyConverterSerivce($http, $q) {
    const CURRENCIES_URL = 'https://openexchangerates.org/api/currencies.json';

    let rates = null;
    let currencies = null;

    return {
        getCurrencies: function () {
            let deferred = $q.defer();

            if (currencies) {
                deferred.resolve(currencies);
            } else {
                $http.get(CURRENCIES_URL)
                    .then((res) => {
                        currencies = res.data;
                        deferred.resolve(currencies);
                    }, (err) => {
                        deferred.reject(err);
                    });
            }

            return deferred.promise;
        },
        convert: function (fromTicker, toTicker, value) {
            let deferred = $q.defer();
            let url = `https://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ("${fromTicker}${toTicker}")&format=json&diagnostics=true&env=store://datatables.org/alltableswithkeys&callback=`;
            let rate = null;

            $http.get(encodeURI(url))
                .then((res) => {
                    rate = parseFloat(res.data.query.results.rate.Rate).toFixed(2);
                    deferred.resolve(value * rate);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }
    }
}

//////////

app.component('currencyConverter', {
    templateUrl: 'currency-converter.tpl.html',
    controller: ['CurrencyConverterSerivce', currencyConverterController]
});

function currencyConverterController(currencyConverterSerivce) {
    currencyConverterSerivce.getCurrencies()
        .then((currencies) => {
            this.currencies = currencies;
        }, (err) => {
            console.error(err);
        });

    this.fromTicker = 'EUR';
    this.toTicker = 'USD';
    this.fromValue = null;
    this.toValue = null;
    this.fromChange = function () {
        currencyConverterSerivce.convert(this.fromTicker, this.toTicker, this.fromValue)
            .then((toValue) => {
                this.toValue = toValue;
            }, (err) => {
                console.error(err);
            });
    };
    this.toChange = function () {
        currencyConverterSerivce.convert(this.toTicker, this.fromTicker, this.toValue)
            .then((fromValue) => {
                this.fromValue = fromValue;
            }, (err) => {
                console.error(err);
            });
    };
}
