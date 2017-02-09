'use strict';
let app = angular.module('app', []);

app.component('appRoot', {
    templateUrl: 'app-root.html',
    controller: function ($element) {
        this.mails = [];

        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'mails.json', false);
        xhr.send();
        if(xhr.status == 200) {
            this.mails = JSON.parse(xhr.responseText);
        }

        this.deleteMail = (item) => {
            for (var i = 0; i < this.mails.length; i++) {
                if (this.mails[i] == item) {
                    this.mails.splice(i, 1);
                    break;
                }
            }
        }
    }
});

app.component('mailBox', {
    templateUrl: 'mails.html',
    controller: function () {
        this.$onDestroy = function() {
            let diff = new Date() - this.mail.datetime;
            diff /= 1000;
            let sec = Math.round(diff % 60);
            let min = Math.round(diff / 60 % 60);
            let hours = Math.round(diff / 3600 % 24);
            let days = Math.round(diff / 3600 / 24);
            console.log(`Время жизни письма: ${days} дней ${hours}ч ${min}м ${sec}с`);
        }
    },
    bindings: {
        mail: '<mail',
        deleteMail: '&deletemail'
    }
});

app.filter('dateAgoFilter', function() {
    return function dateAgoFilter(date) {
        let diff = new Date() - date;

        let minutes = Math.floor(diff / 60000);
        if (minutes < 60) {
            return minutes + ' минут назад';
        }

        let hours = Math.floor(diff / 60000 / 60);
        if (hours < 24) {
            return hours + ' часов назад';
        }

        let days = Math.floor(diff / 60000 / 60 / 24);
        if (days < 365) {
            return days + ' дней назад';
        }

        let years = Math.floor(diff / 60000 / 60 / 24 / 365);
        return years + ' года назад';
    }
});

