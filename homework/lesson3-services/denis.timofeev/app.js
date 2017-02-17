angular.module('currencyConverter', [])
    .component('currencyConverterWidget', {
        templateUrl: 'currency-converter-widget.template.html',
        controller: function ($http, CurrencyConverterService) {

            var self = this;
            self.ammount = '';

            self.currencyCodes = CurrencyConverterService.getCodes().then(function (rates) {
                self.currencyCodes = rates;
            });

            self.result = function () {
                return CurrencyConverterService.convert(self.ammount, self.fromCurrencyCode, self.toCurrencyCode).then(function (data) {
                    return data;
                });
            };

        }
    })
    .factory('CurrencyConverterService', function CurrencyConverterService($http) {
        var ratesPromise = $http.get('rates.json');
        return {
            getCodes: function () {
                return ratesPromise.then(function (rates) {
                    return Object.keys(rates.data);
                });
            },
            convert: function (ammount, from, to) {
                return ratesPromise.then(function (rates) {
                    return ammount * 2;
                })
            }
        }
    })
;