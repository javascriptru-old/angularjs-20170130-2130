class CurrencyApiService {

    constructor($http) {
        this.$http = $http;
    }

    get(from, to) {
        let url = `http://api.fixer.io/latest?base=${from}&symbols=${to}`;
        return this.$http.get(url)
            .then(response => response = response.data,
                error => error = error);
    }
}

angular.module('currency')
    .service('currencyApi', ['$http', CurrencyApiService]);
