'use strict';
let app = angular.module('converterApp', []);


/**
 *  ## Приложение "конвертер валют"
 */

app.component('currencyConverter', {
    templateUrl: 'converter.tmp.html',
    controller: function (CurrencyConverterSerivce) {
        this.convertFrom    = 'USD';
        this.convertTo      = 'RUB';
        this.coefficient    = 1;
        this.currencyList   = [this.convertFrom, this.convertTo];
        this.currencyFirst  = '';
        this.currencyTwo    = '';

        CurrencyConverterSerivce.getCurrencyList().then((data) => {
            this.currencyList = Object.keys(data.rates);
            this.currencyList.push(data.base);
            this.currencyList.sort();
        });

        CurrencyConverterSerivce.getCoefficient(this.convertFrom, this.convertTo).then( (data) => {
            this.coefficient = data;
        })

        this.changeSelectedCurrency = () => {
            CurrencyConverterSerivce.getCoefficient(this.convertFrom, this.convertTo).then( (data) => {
                this.coefficient = data;
                this.changeValue();
            })
        }

        this.changeValue = (value) => {
           switch (value) {
               case 'First':
                   this.currencyTwo = +(this.currencyFirst * this.coefficient).toFixed(2);
                   break;
               case 'Two':
                   this.currencyFirst = +(this.currencyTwo / this.coefficient).toFixed(2);
                   break;
               default:
                   this.currencyTwo = +(this.currencyFirst * this.coefficient).toFixed(2);
                   break;
           }
        }
    }
});

app.service('CurrencyConverterSerivce', function ($http) {
    this.getCurrencyList = () => {
        let url = `http://api.fixer.io/latest`;
        return $http.get( url )
            .then((response) => response.data, () => console.log('Ошибка загрузки данных'));
    }

    this.getCoefficient = ( currencyFrom, currencyTo ) => {
        let url = `http://api.fixer.io/latest?base=${currencyFrom}&symbols=${currencyTo}`;
        return $http.get( url )
            .then((response) => response.data.rates[currencyTo] || 1, () => console.log('Ошибка загрузки данных'));
    }
});


/**
 *  ## Приложение "Список пользователей"
 */

app.component('users', {
    templateUrl: 'users.tmp.html',
    controller: function (UserService) {
        this.users = [];
        UserService.getUsers().then( (data)  => {
            this.users = data;
        });
    }
});

app.service('UserService', function ($http) {
    this.getUsers = () => {
        let url = `https://learn.javascript.ru/courses/groups/api/participants?key=1gvlw0r`;
        return $http.get(url)
            .then((response) => response.data, () => console.log('Ошибка загрузки данных'));
    }
})
