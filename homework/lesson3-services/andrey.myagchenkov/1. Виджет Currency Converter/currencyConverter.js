let app = angular.module('CurrencyConverterApp', ['ngSanitize']);

app.service('rates', function ($http) {

	var url = `https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDRUB,
				EURRUB%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=`;
	this.dataArr = () => $http.get(url);
});

app.service('CurrencyConverterService', function (rates) {

	var ratesArr;
	rates.dataArr().then((data) => {
		ratesArr = data.data.query.results.rate;
	},
		() => { console.log('Ошибка загрузки') });

	this.getCurSum = (rubSum, rateFrom, rateTo) => {
		return rates.dataArr().then(() => {
			let resultSum = 0;
			for (let i = 0; i < ratesArr.length; i++) {
				if (ratesArr[i].id == rateFrom + rateTo) resultSum = rubSum * +ratesArr[i].Rate;
				else if (ratesArr[i].id == rateTo + rateFrom) resultSum = rubSum / +ratesArr[i].Rate;
				else if ((rateFrom + rateTo) == 'USDEUR') resultSum = rubSum * (+ratesArr[0].Rate / +ratesArr[1].Rate);
				else if ((rateFrom + rateTo) == 'EURUSD') resultSum = rubSum * (+ratesArr[1].Rate / +ratesArr[0].Rate);
			}
			if (!resultSum) return 'Курс не найден';
			resultSum = Math.round(resultSum * 100) / 100;
			return resultSum;
		})
	}
});

app.component('currencyConverter', {

	templateUrl: 'template.html',

	controller: ['CurrencyConverterService', function (CCS) {
		this.curSign = { "RUB": "&#8399;", "USD": "$", "EUR": `&#8364;` };
		this.rateFrom = 'USD';
		this.rateTo = 'RUB';
		this.curSum = 0;
		this.myChange = () => {
			if (this.rateFrom == this.rateTo && this.rubSum) {
				this.curSum = this.rubSum;
				return;
			} else if (!this.rubSum) {
				this.curSum = 0;
				return;
			}
			this.curSum = CCS.getCurSum(+this.rubSum, this.rateFrom, this.rateTo);
		}

	}]
});
