    var app = angular.module('converter', []);

    app.service('CurrencyConverterSerivce', function () {
      this.changeInput = (rate, rates) => {
        var x=rate.current.match(/^[0-9]+.?[0-9]*$/)*1;
        if (x != 0) {
          rate.current = x;
          rate.prev = rate.current;
          for (var i = 0; i < rates.length; i++) {
            if (rates[i].CharCode != rate.CharCode) {
               rates[i].current = (x*rates[i].Value/rate.Value).toFixed(4)*1;
               rates[i].prev = rates[i].current;
            }
          }
          return false;
        }
        else
          return true;
      }
    });

    app.service('GetRates', function($http) {
      this.getData = () => $http.get('http://api.fixer.io/latest',
      {
        transformResponse: function (data) {
          var cb = (JSON.parse(data)).rates; 
          var rates = [];
          rates.push({CharCode:"EUR", Value:1, Name:"Евро", sign: "€", flag: "/flags/eu.png", current:1, prev:1});
          rates.push({CharCode:"GBP", Value:cb.GBP, Name:"Фунтов стерлингов Соединенного королевства", sign: "£", flag: "/flags/gb.png", current:cb.GBP, prev:cb.GBP});
          rates.push({CharCode:"USD", Value:cb.USD, Name:"Долларов США", sign: "$", flag: "/flags/us.png", current:cb.USD, prev:cb.USD});
          rates.push({CharCode:"CNY", Value:cb.CNY, Name:"Китайских юаней", sign: "¥", flag: "/flags/cn.png", current:cb.CNY, prev:cb.CNY});
          rates.push({CharCode:"JPY", Value:cb.JPY, Name:"Японских иен", sign: "¥", flag: "/flags/jp.png", current:cb.JPY, prev:cb.JPY});
          rates.push({CharCode:"RUB", Value:cb.RUB, Name:"Российских рублей", sign: "₽", flag: "/flags/ru.png", current:cb.RUB, prev:cb.RUB});
          return rates;                            
        }
      });
    });

    app.component('currencyConverter', {
      templateUrl: 'converter.html',
      controller: ['CurrencyConverterSerivce', 'GetRates', '$http', function (CurrencyConverterSerivce, GetRates, $http) {
        GetRates.getData().then((res) => {
              this.rates = res.data;
            });
            this.error = false;
            this.blurInput = (rate) => {
              if (this.error) {
                rate.current = rate.prev;
                this.error=false;
              }
            }
            this.changeInput = (rate) => {
              this.error = CurrencyConverterSerivce.changeInput(rate, this.rates);
            }
            this.date = Date.now();
            this.dateUpdate = () => {
              this.date = Date.now();
              GetRates.getData().then((res) => {
                this.rates = res.data;
              });
            }
      }]
    });