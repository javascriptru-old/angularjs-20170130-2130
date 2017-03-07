const app = angular.module('app', []);

// start component
app.component('tabs', {
	templateUrl: 'tabs.html',
	controller: function(){
		this.tab = 1
	}
})


// converter
app.component('currencyConverter', {
	templateUrl: 'currency-converter.html',
	controller: function(CurrencyConverterSerivce, $filter, $timeout){

		this.currencyCodes = [ 'EUR', 'RUB', 'USD' ]

		this.leftCurrency = 'RUB'
		this.rightCurrency = 'USD'

		this.leftValue = 1
		this.rightValue = null

		this.loading = true


		this.getRates = ( currency ) => {
			this.loading = true
			CurrencyConverterSerivce.getRates( this.leftCurrency ).then( (data) => {
				this.currencies = data
				this.convert()
				$timeout(() => this.loading = false, 500)
			})
		}

		this.convert = ( left2Right ) => {

			let result

			if( left2Right ) {
				result = this.rightValue / ( this.currencies.rates[ this.rightCurrency ] || 1 )
				this.leftValue = $filter('decimal')( result , 2)
			} else {
				result =this.leftValue * ( this.currencies.rates[ this.rightCurrency ] || 1 )
				this.rightValue = $filter('decimal')( result, 2)
			}

		}

		this.changeInputs = () => {
			let _leftCurrency 	= this.leftCurrency
			let _rightCurrency 	= this.rightCurrency
			this.leftCurrency 	= _rightCurrency
			this.rightCurrency 	= _leftCurrency

			this.getRates( this.leftCurrency )
		}

		this.$onInit = () => {
			this.getRates()
		}
	}
});

app.service('CurrencyConverterSerivce', function( $http ){
	this.getRates = ( base ) => {
		let url =  `http://api.fixer.io/latest?base=${ base || 'RUB' }`
		return $http.get( url ).then((response) => response.data, () => [])
	}
});

app.filter('decimal', function ($filter) {
	return function (input, places) {
		if (isNaN(input)) return input;
		let factor = '1' + Array(+(places > 0 && places + 1)).join('0');
		return Math.round(input * factor) / factor;
	};
});


// user list
app.component( 'userList', {
	templateUrl: 'user-card.html',
	controller: function(UserService){
		UserService.getUsers().then( (data) => {
			this.users = data
		})
	}
});

app.service('UserService', function( $http ){

	let pathTo = ( path ) => {
		return this.BASE + path
	}
	
	this.getUsers = () => {
		return $http.get( pathTo('users.json') ).then(( response ) => response.data, () => [])
	}

});

app.run(( UserService ) => {
	UserService.BASE = './'
});
