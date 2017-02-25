class CurrencyController {

    constructor(currencyApi) {
        this.currencyApi = currencyApi;
    }

    $onInit() {
        this.summ = 1;
        this.currencyArray = ['USD', 'RUB', 'EUR', 'GBP'];
        this.from = 'USD';
        this.to = 'RUB';
    }

    getCurrency() {
        this.currencyApi.get(this.from, this.to)
            .then(response => {
                    this.result = response.rates[this.to];
                },
                error => {
                    console.error(error)
                })
    }

    resetResult(){
        this.result = null;
    }
}

angular.module('currency')
    .component('currency', {
        templateUrl: 'components/currency.component.html',
        controller: ['currencyApi', CurrencyController]
    });